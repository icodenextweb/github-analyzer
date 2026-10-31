export default function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64 space-x-3 text-blue-400 bg-[#0f172a]/30 rounded-3xl border border-[#1e293b]">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="font-medium">Loading your saved items...</span>
    </div>
  );
}