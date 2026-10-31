"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function ReturnLink() {
  const [href, setHref] = useState("/");
  const [label, setLabel] = useState("Home");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setHref("/dashboard");
        setLabel("Dashboard");
      }
    };
    checkAuth();
  }, []);

  return (
    <Link 
      href={href} 
      className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 
      text-blue-500 hover:text-white text-sm rounded-lg transition-colors 
      border border-blue-500/20"
    >
      ← Return to {label}
    </Link>
  );
}