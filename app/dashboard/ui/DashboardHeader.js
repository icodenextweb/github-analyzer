import Link from "next/link";
import AuthButtons from "../../components/auth/AuthButtons";

export default function DashboardHeader({ userName = "My" }) {
  const titlePrefix = userName === "My" ? "My" : `${userName}'s`;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-white/10 gap-4">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight capitalize">
          {titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dashboard</span>
        </h1>
        <p className="text-slate-400 mt-2 text-sm">Manage and analyze your saved GitHub assets.</p>
      </div>
      <div className="flex gap-4 items-center">
        <Link 
          href="/profile" 
          className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 font-semibold border border-slate-700 shadow-sm"
        >
          Edit Profile
        </Link>
        <Link 
          href="/" 
          className="px-5 py-2.5 bg-blue-600/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-300 font-semibold border border-blue-500/30 shadow-sm"
        >
          + New Search
        </Link>
        <AuthButtons /> 
      </div>
    </div>
  );
}