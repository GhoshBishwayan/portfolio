export function ProgressBar({
  accent = "#6ee7b7", // default to emerald-300 hex equivalent roughly
  className = "",
  label,
  value,
}: {
  accent?: string;
  className?: string;
  label: string;
  value: number;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex justify-between text-xs font-medium text-zinc-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
}
