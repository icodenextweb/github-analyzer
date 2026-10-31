import { FaThLarge, FaUserAlt, FaBox, FaHeart } from "react-icons/fa";

export default function Sidebar({ 
  activeFilter, 
  setActiveFilter, 
  itemsCount, 
  profilesCount, 
  reposCount,
  favoritesCount 
}) {
  const filters = [
    { id: "all", label: "All Items", icon: FaThLarge, count: itemsCount, colorKey: "blue" },
    { id: "profile", label: "Profiles", icon: FaUserAlt, count: profilesCount, colorKey: "purple" },
    { id: "repo", label: "Repositories", icon: FaBox, count: reposCount, colorKey: "emerald" },
    { id: "favorites", label: "Favorites", icon: FaHeart, count: favoritesCount, colorKey: "rose" },
  ];

  const getActiveStyles = (colorKey) => {
    const styles = {
      blue: "bg-blue-600/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      purple: "bg-purple-600/20 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      emerald: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      rose: "bg-rose-600/20 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    };
    return styles[colorKey];
  };

  return (
    <aside className="lg:w-64 shrink-0 w-full">
      <div className="sticky top-28 bg-[#0f172a]/60 backdrop-blur-md border border-[#1e293b] rounded-2xl p-4 flex flex-col gap-2 shadow-xl shadow-black/50">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Filters</h2>
        
        {filters.map(({ id, label, icon: Icon, count, colorKey }) => {
          const isActive = activeFilter === id;
          const dynamicStyles = isActive 
            ? getActiveStyles(colorKey) 
            : "text-slate-400 hover:bg-white/5 hover:text-white border-transparent";

          return (
            <button 
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${dynamicStyles}`}
            >
              <span className="font-medium flex items-center gap-3">
                <Icon className="text-lg" /> {label}
              </span>
              <span className="bg-[#020617] px-2 py-0.5 rounded-md text-xs border border-[#1e293b]">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}