import { BentoGrid } from "@/components/bento-grid";
import { SiteNav } from "@/components/site-nav";
import { TerminalPanel } from "@/components/terminal-panel";
import { PortfolioViewProvider } from "@/components/view-context";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-white/20">
      <PortfolioViewProvider>
        <SiteNav />
        <div className="mx-auto flex max-w-[1600px] flex-col gap-9 px-4 pb-12 pt-4 lg:flex-row lg:px-8">
          <TerminalPanel />
          <BentoGrid />
        </div>
      </PortfolioViewProvider>
    </main>
  );
}
