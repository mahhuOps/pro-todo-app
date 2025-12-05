"use client"

import { useTodos } from "./todo-context"
import { TodoItem } from "./todo-item"
import { ListTodo } from "lucide-react"
import { useState } from "react"

type FilterType = "all" | "active" | "completed"
type SortType = "date" | "priority" | "category"

export function TodoList() {
  const { todos } = useTodos()
  const [filter, setFilter] = useState<FilterType>("all")
  const [sort, setSort] = useState<SortType>("date")

  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "priority") {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    if (sort === "category") {
      return a.category.localeCompare(b.category)
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortType)}
          className="px-3 py-1 rounded-md text-sm border border-input bg-background"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      <div className="space-y-2">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ListTodo className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground">
              {todos.length === 0 ? "No tasks yet. Create one to get started!" : "No tasks match your filters."}
            </p>
          </div>
        ) : (
          sorted.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  )
}
