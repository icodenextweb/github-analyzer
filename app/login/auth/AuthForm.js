"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logInUser, signUpUser } from "../../lib/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await logInUser(email, password);
    if (error) setMessage(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUpUser(email, password);
    if (error) setMessage(error.message);
    else setMessage("Success! Check your email to confirm.");
    setLoading(false);
  };

  return (
    <form className="space-y-4 w-full">
      <input 
        type="email" 
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-[#020617] border border-[#1e293b] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
        required
      />
      <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-[#020617] border border-[#1e293b] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
        required
      />
      
      {message && <p className="text-sm text-blue-400 text-center">{message}</p>}
      
      <div className="flex gap-4 pt-2">
        <button onClick={handleLogin} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 transition-colors">
          Login
        </button>
        <button onClick={handleSignUp} disabled={loading} className="flex-1 bg-[#020617] border border-[#1e293b] text-slate-300 hover:border-blue-500 py-3 rounded-xl font-semibold disabled:opacity-50 transition-colors">
          Sign Up
        </button>
      </div>
    </form>
  );
}