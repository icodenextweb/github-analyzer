export default function Avatar({ src, alt, className = "w-16 h-16" }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`rounded-full border-[1.5] border-blue-500  shrink-0 bg-slate-800 object-cover ${className}`}
    />
  );
}