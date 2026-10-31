import Link from "next/link";

export default function EmptyState({ hasItems, activeFilter }) {
  const message = !hasItems
    ? "You haven't saved any GitHub profiles or repositories to your dashboard yet."
    : `You don't have any saved ${activeFilter === "profile" ? "profiles" : "repositories"} right now.`;

  return (
    <div className="text-center p-16 bg-gradient-to-b from-[#0f172a]/80 to-[#020617] border border-[#1e293b] rounded-3xl shadow-xl">
      <div className="text-6xl mb-6 drop-shadow-lg">📂</div>
      <h2 className="text-2xl font-bold text-white mb-3">No items found</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">{message}</p>
      <Link 
        href="/" 
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-all"
      >
        Go analyze something
      </Link>
    </div>
  );
}