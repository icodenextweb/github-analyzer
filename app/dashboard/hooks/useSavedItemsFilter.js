import { useState, useMemo } from "react";

export default function useSavedItemsFilter(items) {
  const [activeFilter, setActiveFilter] = useState("all");

  const isProfile = (item) => {
    const type = item.target_type.toLowerCase();
    return type.includes('profile') || type.includes('user');
  };
  const isRepo = (item) => item.target_type.toLowerCase().includes('repo');

  const profilesCount = useMemo(() => items.filter(isProfile).length, [items]); 
  const reposCount = useMemo(() => items.filter(isRepo).length, [items]); 
  
 
  const favoritesCount = useMemo(() => items.filter(item => item.is_favorite).length, [items]); 

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (activeFilter === "profile") return isProfile(item);
      if (activeFilter === "repo") return isRepo(item);
      if (activeFilter === "favorites") return item.is_favorite; 
      return true; 
    }); 
  }, [items, activeFilter]);

  return {
    activeFilter,
    setActiveFilter,
    profilesCount,
    reposCount,
    favoritesCount, 
    filteredItems
  };
}