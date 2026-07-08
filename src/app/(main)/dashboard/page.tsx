// src/app/(workspace)/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Square } from "lucide-react";

export default function DashboardPage() {
  const mockTasks = [
    { id: "1", title: "Complete Next.js UI integration", status: "active" },
    { id: "2", title: "Record YouTube technical tutorial", status: "active" },
    { id: "3", title: "Friday night date plans", status: "active" },
    { id: "4", title: "Weekly 10km run", status: "completed" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Today</h1>
        <p className="text-muted-foreground">Focus on what matters.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8 rounded-none border-border shadow-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg uppercase tracking-wider">
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {mockTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center p-4 hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={task.id}
                    checked={task.status === "completed"}
                    className="mr-4 rounded-none border-foreground"
                  />
                  <label
                    htmlFor={task.id}
                    className={`text-sm font-medium leading-none cursor-pointer ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="md:col-span-4 space-y-6">
          <Card className="rounded-none border-border shadow-none bg-foreground text-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-background/70">
                Focus Session
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <span className="text-5xl font-bold mb-6 font-mono tracking-tighter">
                25:00
              </span>
              <div className="flex gap-4">
                <button
                  className="p-3 bg-background text-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Start Timer"
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <button
                  className="p-3 border border-background text-background hover:bg-background/20 transition-colors"
                  aria-label="Stop Timer"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-border shadow-none h-64 flex flex-col">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="text-sm uppercase tracking-wider">
                Quick Note
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <textarea
                className="w-full h-full p-4 resize-none bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                placeholder="Capture a thought..."
                defaultValue={
                  "- Need to test database schema export logic.\n- Check UI responsiveness."
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
