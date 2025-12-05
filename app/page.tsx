"use client"

import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"
import { StatsPanel } from "@/components/stats-panel"
import { CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Todo Pro Max</h1>
          </div>
          <p className="text-muted-foreground">Premium task management with priorities, categories, and due dates</p>
        </div>

        {/* Stats */}
        <StatsPanel />

        {/* Add Todo Form */}
        <AddTodoForm />

        {/* Todo List */}
        <TodoList />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>Tasks are saved locally to your browser</p>
        </div>
      </div>
    </main>
  )
}
