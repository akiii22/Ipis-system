import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

export const useAuthLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      console.error("Login error details:", error);
      toast.error((error as { message?: string })?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  //  NEW: Password reset email dispatcher
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address first.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset link sent! Check your email inbox.");
    } catch (error: unknown) {
      console.error("Password reset error details:", error);
      toast.error((error as { message?: string })?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    handleLoginSubmit,
    handleForgotPassword, 
  };
};