"use client"

import { useTodos } from "./todo-context"
import { CheckCircle2, ListTodo, AlertCircle, Target } from "lucide-react"

export function StatsPanel() {
  const { stats } = useTodos()

  const statItems = [
    { icon: Target, label: "Total", value: stats.total, color: "text-primary" },
    { icon: ListTodo, label: "Pending", value: stats.pending, color: "text-accent" },
    { icon: CheckCircle2, label: "Completed", value: stats.completed, color: "text-green-600 dark:text-green-400" },
    { icon: AlertCircle, label: "Urgent", value: stats.urgent, color: "text-destructive" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {statItems.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-card p-4 flex flex-col items-center gap-2">
          <item.icon className={`h-5 w-5 ${item.color}`} />
          <p className="text-2xl font-bold text-foreground">{item.value}</p>
          <p className="text-xs text-muted-foreground text-center">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
