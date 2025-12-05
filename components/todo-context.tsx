"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { todoStore } from "@/lib/todo-store"

interface Todo {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  dueDate?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoContextType {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void
  updateTodo: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => void
  deleteTodo: (id: string) => void
  stats: ReturnType<typeof todoStore.getStats>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [stats, setStats] = useState(todoStore.getStats())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setTodos(todoStore.getTodos())
    setStats(todoStore.getStats())
    setHydrated(true)
  }, [])

  const addTodo = (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => {
    const newTodo = todoStore.addTodo(todo)
    setTodos((prev) => [...prev, newTodo])
    setStats(todoStore.getStats())
  }

  const updateTodo = (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
    todoStore.updateTodo(id, updates)
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
    setStats(todoStore.getStats())
  }

  const deleteTodo = (id: string) => {
    todoStore.deleteTodo(id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
    setStats(todoStore.getStats())
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, stats }}>
      {hydrated ? children : <div className="min-h-screen" />}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodos must be used within TodoProvider")
  }
  return context
}
