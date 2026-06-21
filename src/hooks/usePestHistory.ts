// hooks/usePestHistory.ts
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export type HistoryItem = {
  id: string;
  date: string;
  time: string;
  pestName: string;
  confidence: number;
  riskLevel: "High" | "Medium" | "Low";
  imageUrl: string;
  recommendation: string;
  isFavorited: boolean; // Tracks real database flag status
};

export const usePestHistory = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setLoading(true);
      setError(null);
    }
    await Promise.resolve();

    try {
      const { data, error: fetchError } = await supabase
        .from("scans")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      if (data) {
        const mappedData: HistoryItem[] = data.map((row) => {
          const timestamp = new Date(row.created_at);
          const formattedConfidence = row.confidence <= 1 
            ? Math.round(row.confidence * 100) 
            : Math.round(row.confidence);

          return {
            id: row.id,
            pestName: row.detected_pest,
            imageUrl: row.image_url,
            confidence: formattedConfidence,
            riskLevel: (row.risk_severity || "Medium") as "High" | "Medium" | "Low",
            recommendation: row.recommendation || "No recommendation logged.",
            isFavorited: row.is_favorited || false, // Capture database value
            date: timestamp.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
            time: timestamp.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false }),
          };
        });
        setHistoryItems(mappedData);
      }
    } catch (err) {
      console.error("Error pulling scan ledger:", err);
      setError("Failed to synchronize your historical scan telemetry.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update specific row flag instantly on screen and in database
  const toggleFavorite = async (id: string, currentStatus: boolean): Promise<boolean> => {
    const nextStatus = !currentStatus;

    // Optimistic UI change
    setHistoryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorited: nextStatus } : item))
    );

    try {
      const { error: updateError } = await supabase
        .from("scans")
        .update({ is_favorited: nextStatus })
        .eq("id", id);

      if (updateError) throw updateError;
      return nextStatus;
    } catch (err) {
      console.error("Failed to sync favorite status update:", err);
      // Revert to database state on failure
      fetchHistory();
      return currentStatus;
    }
  };

  const deleteItem = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase.from("scans").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setHistoryItems((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete record:", err);
      return false;
    }
  };

  const clearAllHistory = async (): Promise<boolean> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) return false;

      const { error: clearError } = await supabase.from("scans").delete().eq("user_id", userId);
      if (clearError) throw clearError;
      setHistoryItems([]);
      return true;
    } catch (err) {
      console.error("Failed to clear whole history:", err);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const runSetup = async () => {
      if (isMounted) await fetchHistory();
    };
    runSetup();
    return () => { isMounted = false; };
  }, [fetchHistory]);

  return { historyItems, loading, error, toggleFavorite, deleteItem, clearAllHistory, refetch: () => fetchHistory(true) };
};