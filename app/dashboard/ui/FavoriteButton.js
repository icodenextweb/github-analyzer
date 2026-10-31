"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      className={`text-sm shrink-0 p-2 transition-all hover:scale-125 focus:outline-none ${
        isFavorite ? "text-rose-500 " : "text-slate-400 hover:text-rose-400"
      }`}
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}