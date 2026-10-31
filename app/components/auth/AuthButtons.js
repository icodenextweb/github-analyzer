"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { logOutUser } from "../../lib/auth";

export default function AuthButtons() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logOutUser();
    setUser(null);
    router.push("/");
  };

  if (user) {
    return (
      <div className="flex gap-3 items-center">
        {pathname !== "/dashboard" && (
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-colors border border-blue-500/20">
            Dashboard
          </Link>
        )}
        <button onClick={handleLogout} className="px-4 py-2 border border-[#1e293b] text-slate-300 hover:bg-[#1e293b] rounded-lg transition-colors">
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="px-4 py-2 bg-[#020617] text-slate-300 hover:text-white rounded-lg font-semibold transition-colors border border-[#1e293b] hover:border-blue-500">
      Login | Sign Up
    </Link>
  );
}