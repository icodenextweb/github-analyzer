"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function SaveNote({ type, targetName }) {
  const [note, setNote] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const typeLabel = type === "repo" ? "repository" : "profile";

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from("saved_items")
          .select("note, is_favorite")
          .eq("user_id", user.id)
          .eq("target_name", targetName)
          .single();
          
        if (data) {
          setNote(data.note || "");
          setIsFavorite(data.is_favorite);
        }
      }
    };
    fetchUserData();
  }, [targetName]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("saved_items")
      .upsert({
        user_id: userId,
        target_type: type,
        target_name: targetName,
        note: note,
        is_favorite: isFavorite
      }, { onConflict: 'user_id,target_name' });

    if (error) setMessage("Error saving data.");
    else setMessage("✓ Saved successfully!");
    setLoading(false);
  };

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    await supabase.from("saved_items").upsert({
      user_id: userId,
      target_type: type,
      target_name: targetName,
      note: note,
      is_favorite: !isFavorite
    }, { onConflict: 'user_id,target_name' });
    setMessage(!isFavorite ? "✓ Added to Favorites!" : "Removed from Favorites.");
  };

  if (!userId) {
    return (
      <div className="mt-8 pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row justify-between items-center bg-[#020617] p-4 rounded-xl gap-4">
        <p className="text-slate-400 text-sm md:text-base">Want to save this {typeLabel} or add custom notes?</p>
        <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors shrink-0">
          Log in to Save
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-[#1e293b]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-semibold">Dashboard Controls</h4>
        <button 
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${
            isFavorite 
            ? "bg-rose-500/10 text-rose-500 border-rose-500/30" 
            : "bg-[#020617] text-slate-400 border-[#1e293b] hover:text-white"
          }`}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-3">
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={`Write a custom note for this ${typeLabel}...`}
          rows="4"
          className="w-full bg-[#020617] border border-[#1e293b] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 resize-y"
        />
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
      {message && <p className="text-sm mt-3 text-emerald-400 font-medium">{message}</p>}
    </div>
  );
}