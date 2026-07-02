import { Search } from "lucide-react";
import { ChangeEvent } from "react";

export function SearchInput({
  autoFocus = false,
  className = "",
  onChange,
  placeholder,
  value,
}: {
  autoFocus?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-zinc-500 transition-colors focus-within:border-white/30 focus-within:bg-white/[0.06] hover:border-white/20 ${className}`}
    >
      <Search size={18} strokeWidth={1.8} />
      <input
        autoFocus={autoFocus}
        className="h-full w-full min-w-0 flex-1 bg-transparent text-zinc-200 outline-none placeholder:text-zinc-600"
        onChange={onChange}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </label>
  );
}
