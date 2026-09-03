import { useState } from "react";
import { supabase } from "../lib/supabase";
import { type Prediction, CONFIDENCE_THRESHOLD, pestInfo, getNormalizedClass } from "../data/pestData";

type LocalPestData = typeof pestInfo[keyof typeof pestInfo];

// Quality threshold for blurry or unidentifiable specimen images (55%)
const BLUR_QUALITY_THRESHOLD = 0.55;

export const usePestScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
  const MODEL_ENDPOINT = import.meta.env.VITE_ROBOFLOW_MODEL_ENDPOINT;

  const uploadPestImage = async (file: File): Promise<string | null> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) throw new Error("Unauthorized context");

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("pest-scans").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = await supabase.storage.from("pest-scans").createSignedUrl(filePath, 31536000);
      if (urlError) throw urlError;

      return urlData.signedUrl;
    } catch (err) {
      console.error("Storage bucket failure:", err);
      return null;
    }
  };

  const saveScanToHistory = async (
    predictionData: Prediction, 
    imageUrl: string, 
    localPestData?: LocalPestData | null
  ) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user.id) return;

      const { error } = await supabase.from("scans").insert({
        user_id: sessionData.session.user.id,
        image_url: imageUrl,
        detected_pest: predictionData.class,
        confidence: predictionData.confidence,
        risk_severity: localPestData?.risk || "Unknown",
        recommendation: localPestData?.recommendation || "No recommendation found.",
      });
      if (error) throw error;
    } catch (err) {
      console.error("Database sync layer failure:", err);
    }
  };

  const processImageWithRoboflow = async (base64Image: string, rawFile: File) => {
    setLoading(true);
    setError(null);
    setWarning(null);
    setPrediction(null);

    try {
      const response = await fetch(
        `https://detect.roboflow.com/${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: base64Image,
        }
      );

      if (!response.ok) throw new Error(`Roboflow returned tracking error: ${response.status}`);
      const data = await response.json();

      if (!data.predictions || data.predictions.length === 0) {
        setError("No pest detected in the image. Please try another shot.");
        return;
      }

      const bestPrediction = data.predictions.sort((a: Prediction, b: Prediction) => b.confidence - a.confidence)[0];

      // Threshold Check 1: Image Blurry / Out of Focus / Unclear Specimen
      if (bestPrediction.confidence < BLUR_QUALITY_THRESHOLD) {
        setError(
          `Image unclear or blurry (Match Confidence: ${Math.round(bestPrediction.confidence * 100)}%). Please upload or capture a well-lit, close-up photograph.`
        );
        return;
      }

      // Threshold Check 2: Low-Moderate Confidence Warning Flag
      if (bestPrediction.confidence < CONFIDENCE_THRESHOLD) {
        setWarning(
          `Moderate detection confidence (${Math.round(bestPrediction.confidence * 100)}%). Verify specimen features carefully.`
        );
      }

      setPrediction(bestPrediction);

      // Execute backend storage orchestration pipeline
      const permanentUrl = await uploadPestImage(rawFile);
      if (permanentUrl) {
        const key = getNormalizedClass(bestPrediction.class);
        const mappedPest = pestInfo[key as keyof typeof pestInfo];
        await saveScanToHistory(bestPrediction, permanentUrl, mappedPest);
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || "Unexpected telemetry diagnostics error.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setWarning(null);
    setPrediction(null);
    setImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      processImageWithRoboflow(base64.split(",")[1], file);
    };
    reader.readAsDataURL(file);
  };

  const clearScanner = () => {
    setImage(null);
    setPrediction(null);
    setError(null);
    setWarning(null);
  };

  return { image, loading, error, warning, prediction, handleImageUpload, clearScanner };
};