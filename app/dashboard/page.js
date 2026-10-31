"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase"; 
import { useRouter } from "next/navigation";
import Sidebar from "./ui/Sidebar"; 
import SavedItemCard from "./ui/SavedItemCard"; 
import useSavedItemsFilter from "./hooks/useSavedItemsFilter"; 
import DashboardHeader from "./ui/DashboardHeader";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "./ui/EmptyState";

export default function Dashboard() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("My"); 
  const router = useRouter(); 

  const { 
    activeFilter, 
    setActiveFilter, 
    profilesCount, 
    reposCount, 
    filteredItems,
    favoritesCount,
  } = useSavedItemsFilter(items);

  const fetchDashboardData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser(); 
    
    if (!user) {
      router.push("/login"); 
      return;
    }

    const fetchedName = user.user_metadata?.name || user.email?.split('@')[0] || "My";
    setUserName(fetchedName);

    const { data, error } = await supabase
      .from("saved_items")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false }); 

    if (!error && data) {
      setItems(data);
    } else {
      console.error("Failed to load dashboard data:", error);
    }
    
    setLoading(false); 
  }, [router]);

  useEffect(() => {
    fetchDashboardData(); 
  }, [fetchDashboardData]); 

  const handleUpdateFavorite = (itemId, newFavoriteStatus) => {
    setItems((prev) => 
      prev.map((item) => item.id === itemId ? { ...item, is_favorite: newFavoriteStatus } : item)
    );
  };

  const handleDeleteItem = async (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    const { error } = await supabase.from("saved_items").delete().eq("id", itemId);
    if (error) fetchDashboardData(); 
  };

  return (
    <div className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] text-white p-4">
      <div className="max-w-7xl mx-auto">
        
       
        <DashboardHeader userName={userName} />

        <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
          <Sidebar 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            itemsCount={items.length} 
            profilesCount={profilesCount} 
            reposCount={reposCount} 
            favoritesCount={favoritesCount}
          />

          <main className="flex-1 w-full">
            {loading ? (
              <LoadingState />
            ) : filteredItems.length === 0 ? (
              <EmptyState hasItems={items.length > 0} activeFilter={activeFilter} />
            ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <SavedItemCard 
                    key={item.id} 
                    item={item} 
                    onUpdateFavorite={handleUpdateFavorite}
                    onDelete={handleDeleteItem} 
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}