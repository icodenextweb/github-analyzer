"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import ProfileEditor from "./profileEditor";
import DashboardHeader from "../dashboard/ui/DashboardHeader";
import LoadingPage from "../components/ui/LoadingPage";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
      else setUser(user);
    };
    getUser();
  }, [router]);

  if (!user) return <LoadingPage/>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <main className="mt-8 max-w-2xl">
          <ProfileEditor currentUser={user} />
        </main>
      </div>
    </div>
  );
}