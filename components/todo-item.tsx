"use client"

import { Trash2, CheckCircle2, Circle } from "lucide-react"
import { useTodos } from "./todo-context"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface Todo {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  dueDate?: string
  completed: boolean
}

export function TodoItem({ todo }: { todo: Todo }) {
  const { updateTodo, deleteTodo } = useTodos()

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    urgent: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  }

  const daysUntilDue = todo.dueDate
    ? Math.ceil((new Date(todo.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  const isOverdue = daysUntilDue !== null && daysUntilDue < 0 && !todo.completed

  return (
    <div
      className={`group flex items-start gap-3 rounded-lg border p-4 transition-all hover:shadow-md ${
        todo.completed ? "bg-muted/30 border-muted" : "bg-card border-border hover:border-primary/30"
      }`}
    >
      <button
        onClick={() => updateTodo(todo.id, { completed: !todo.completed })}
        className="mt-1 transition-colors hover:text-primary"
      >
        {todo.completed ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className={`font-medium leading-tight ${
              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {todo.title}
          </h3>
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
        </div>

        {todo.description && <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{todo.description}</p>}

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 bg-secondary/50 rounded">{todo.category}</span>
          {todo.dueDate && (
            <span className={isOverdue ? "text-destructive font-medium" : ""}>
              {isOverdue ? "Overdue: " : ""}
              {format(new Date(todo.dueDate), "MMM d")}
            </span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
