export default function StatCard({ label, value }) {
  return (
    <div className="bg-[#020617] border border-[#1e293b] p-4 rounded-xl text-center">
      <div className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-blue-500">{value}</div>
    </div>
  );
}