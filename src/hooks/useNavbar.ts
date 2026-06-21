import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

export const useNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    const fetchNavbarUserData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        if (user) {
          setEmail(user.email || "");

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
        }
      } catch (err) {
        console.error("Navbar identity sync error:", err);
      } finally {
        setFetchingUser(false);
      }
    };

    fetchNavbarUserData();

    // Live sync channel: instantly catches avatar/username modifications from the Account page
    const profileVisibilityChannel = supabase
      .channel("navbar-profile-sync")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        async (payload) => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && payload.new.id === user.id) {
            setUsername(payload.new.username || "");
            setAvatarUrl(payload.new.avatar_url || null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileVisibilityChannel);
    };
  }, []);

  // Dropdown boundary detection logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      console.error("Logout execution error:", error);
      toast.error((error as { message?: string })?.message || "Failed to sign out securely.");
    }
  };

  // Safe string derivation parsing helpers
  const welcomeName = username ? username.split(" ")[0] : "User";
  const userInitial = username 
    ? username.charAt(0).toUpperCase() 
    : (email ? email.charAt(0).toUpperCase() : "U");

  return {
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    email,
    username,
    avatarUrl,
    fetchingUser,
    welcomeName,
    userInitial,
    handleLogout,
  };
};