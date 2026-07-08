import { ReactNode } from "react";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-64 border-r border-border flex flex-col justify-between bg-background">
        <div className="p-4">
          <h2 className="text-lg font-bold tracking-tight mb-8 uppercase">
            Flowspace
          </h2>

          <div className="mb-8">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              Active Workspace
            </p>
            <select className="w-full p-2 border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
              <option>Developer Work</option>
              <option>Personal Life</option>
            </select>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="block p-2 bg-foreground text-background font-medium text-sm"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block p-2 hover:bg-muted transition-colors font-medium text-sm"
            >
              Statistics
            </a>
            <a
              href="#"
              className="block p-2 hover:bg-muted transition-colors font-medium text-sm"
            >
              Settings
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1 uppercase">
            Now Playing
          </p>
          <p className="text-sm font-bold truncate">lofi_beats_01.mp3</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background p-8">
        {children}
      </main>
    </div>
  );
}
