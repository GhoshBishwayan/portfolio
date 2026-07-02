export function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#101116] p-3 transition-colors hover:border-white/20">
      <div className="text-xs font-medium text-zinc-600">{label}</div>
      <div className="mt-1 font-medium text-zinc-300">{value}</div>
    </div>
  );
}
