import AuthForm from "./auth/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#020617] bg-pattern flex flex-col justify-center items-center px-6 relative">
      <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors">
        ← Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-sm p-8 rounded-2xl border border-[#1e293b] shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome to <span className="text-blue-500">GitAnalyzer</span>
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}