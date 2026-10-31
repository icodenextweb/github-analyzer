export default function Loading() {
  return (
    <div className="bg-[#020617] bg-pattern flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>        
        <p className="text-slate-400 font-medium tracking-wide">Loading...</p>
        
      </div>
    </div>
  );
}