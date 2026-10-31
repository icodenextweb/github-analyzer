"use client";
import { useState } from "react";
import Link from "next/link";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";
import FavoriteButton from "./FavoriteButton"; 
import { supabase } from "../../lib/supabase"; 

export default function SavedItemCard({ item, onUpdateFavorite, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const targetType = item.target_type?.toLowerCase() || "";
  const isProfile = targetType === "profile" || targetType === "user"; 
  const isRepo = targetType === "repo" || targetType === "repository"; 

  const handleToggle = async (e) => {
    e.preventDefault(); 
    const newFavoriteStatus = !item.is_favorite;

    if (onUpdateFavorite) onUpdateFavorite(item.id, newFavoriteStatus);

    const { error } = await supabase
      .from("saved_items")
      .update({ is_favorite: newFavoriteStatus })
      .eq("id", item.id);

    if (error) {
      console.error("Error updating favorite status:", error);
      if (onUpdateFavorite) onUpdateFavorite(item.id, !newFavoriteStatus); 
    }
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    if (onDelete) onDelete(item.id);
  };

  const badgeStyles = isRepo 
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
    : "bg-purple-500/10 text-purple-400 border-purple-500/20";

  return (
    <div className="bg-[#0f172a]/60 backdrop-blur-xl p-4 rounded-2xl border border-[#1e293b] shadow-lg hover:-translate-y-1 hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-blue-500/20"></div>

      <div className="flex justify-between items-start mb-3 gap-2 relative z-10">
        <div className="flex items-center gap-3 overflow-hidden">
          {isProfile && (
            <Avatar 
              src={`https://github.com/${item.target_name}.png?size=40`} 
              alt={item.target_name} 
              className="w-8 h-8" 
            />
          )}
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 truncate">
            <span className="truncate">{item.target_name}</span> 
            <FavoriteButton isFavorite={item.is_favorite} onToggle={handleToggle} />
          </h3>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border shadow-sm ${badgeStyles}`}>
            {item.target_type} 
          </span>
          {showConfirm ? (
            <div className="flex items-center gap-1 bg-red-500/10 p-1 rounded-md border border-red-500/20">
              <button onClick={confirmDelete} className="text-red-400 hover:text-red-300 p-1" title="Confirm">
                <FaCheck size={12} />
              </button>
              <button onClick={(e) => { e.preventDefault(); setShowConfirm(false); }} className="text-slate-400 hover:text-slate-200 p-1" title="Cancel">
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <button 
              onClick={(e) => { e.preventDefault(); setShowConfirm(true); }} 
              className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-md transition-all duration-200"
              title="Delete Item"
            >
              <FaTrash size={12} />
            </button>
          )}
        </div>
      </div>

      <Link 
        href={`/report?type=${item.target_type}&prompt=${item.target_name}`}
        className="flex-1 mb-4 relative z-10 group/note block cursor-pointer"
        title="Click to view full report"
      >
        <p className="text-sm text-slate-400 truncate leading-relaxed group-hover/note:text-slate-200 transition-colors">
          {item.note ? item.note : <span className="italic opacity-40">No notes added.</span>} 
        </p>
      </Link>

      <div className="flex gap-2 mt-auto relative z-10">
        <Link 
          href={`/report?type=${item.target_type}&prompt=${item.target_name}`} 
          className="flex-1 inline-flex items-center justify-center gap-2 py-2 bg-[#1e293b]/50 hover:bg-blue-500/20 text-sm 
          font-semibold text-slate-300 hover:text-blue-400 rounded-xl transition-all duration-300 border border-transparent 
          hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        >
          Live stats <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <a 
          href={`https://github.com/${item.target_name}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-[#1e293b]/50 hover:bg-slate-700/50 text-sm 
          font-semibold text-slate-300 hover:text-white rounded-xl transition-all duration-300 border border-transparent
           hover:border-slate-500/30"
        >
          Visit Github
        </a>
      </div>
    </div>
  );
}