"use client";
import { useState } from "react";
import Button from "../components/ui/Button";

export default function Form() {
  const [tab, setTab] = useState("profile");
  const isProfile = tab === "profile";

  return (
    <div className="w-full max-w-3xl bg-[#0f172a]/90 backdrop-blur-sm p-6 rounded-2xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] border border-[#1e293b]">
      <div className="flex justify-center space-x-6 mb-6 pb-4 border-b border-[#1e293b]">
        <button
          type="button"
          onClick={() => setTab("profile")}
          className={`pb-2 font-semibold border-b-2 transition-colors ${
            isProfile ? "text-blue-500 border-blue-500" : "text-slate-400 border-transparent hover:text-white"
          }`}
        >
          Analyze Profile
        </button>
        <button
          type="button"
          onClick={() => setTab("repo")}
          className={`pb-2 font-semibold border-b-2 transition-colors ${
            !isProfile ? "text-blue-500 border-blue-500" : "text-slate-400 border-transparent hover:text-white"
          }`}
        >
          Analyze Repository
        </button>
      </div>

 <form action="/report" method="GET" className="w-full flex flex-col md:flex-row items-center gap-3">
  <input type="hidden" name="type" value={tab} />
  
  <input
    name="prompt"
    placeholder={isProfile ? "e.g. torvalds" : "e.g. facebook/react"}
    type="text"
    required

    className="w-full h-12 bg-[#020617] border border-[#1e293b] text-white rounded-xl px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
  />
  
  <Button
    btnType="submit"
    btnText="Generate Report"
    
    className="w-full md:w-auto h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 
    text-white px-6 rounded-xl font-semibold transition-colors whitespace-nowrap"
  />
</form>
    </div>
  );
}