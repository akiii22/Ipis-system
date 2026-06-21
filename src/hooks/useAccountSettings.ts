import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

export const useAccountSettings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [totalScans, setTotalScans] = useState(0);

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Fetch all user account metrics on load
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (user) {
          setEmail(user.email || "");

          // 1. Fetch metadata from profiles table
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", user.id)
            .single();

          if (profileError && profileError.code !== "PGRST116") throw profileError;
          
          if (profile) {
            setUsername(profile.username || "");
            setAvatarUrl(profile.avatar_url || null);
          }

          // 2. Fetch live exact aggregate scan count
          const { count, error: scansError } = await supabase
            .from("scans")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

          if (scansError) throw scansError;
          setTotalScans(count || 0);
        }
      } catch (err: unknown) {
        console.error("Account payload collection error:", err);
        toast.error("Failed to sync account configuration metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  // Update profile text information
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username field cannot be blank.");
      return;
    }

    setUpdatingProfile(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Active session expired.");

      const { error } = await supabase
        .from("profiles")
        .update({ username: username.trim() })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as { message?: string })?.message || "Failed to save profile changes.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Upload avatar image to public storage bucket
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Session invalid.");

      // Enforce file tracking paths directly matching user id tokens
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}.${fileExt}`;

      // 1. Core bucket upload sequence (Upsert replaces old files instantly)
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Compute non-expiring public web link
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Cache buster parameter ensures browsers don't serve old cached images
      const finalizedUrl = `${publicUrl}?t=${Date.now()}`;

      // 3. Save reference path inside profiles schema row
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ avatar_url: finalizedUrl })
        .eq("id", user.id);

      if (profileError) throw profileError;

      setAvatarUrl(finalizedUrl);
      toast.success("Avatar updated successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as { message?: string })?.message || "Storage validation error. Check file type/size limits.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Securely update account login credentials
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Security criteria unmet: password must be at least 6 characters.");
      return;
    }

    setUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      toast.success("Security credentials modified successfully!");
      setNewPassword("");
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as { message?: string })?.message || "Failed to update security credentials.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    avatarUrl,
    totalScans,
    newPassword,
    setNewPassword,
    loading,
    updatingProfile,
    updatingPassword,
    uploadingAvatar,
    handleUpdateProfile,
    handleAvatarUpload,
    handleUpdatePassword,
  };
};