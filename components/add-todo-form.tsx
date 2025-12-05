"use client"

import type React from "react"

import { useState } from "react"
import { useTodos } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Learning"]
const PRIORITIES = ["low", "medium", "high", "urgent"] as const

export function AddTodoForm() {
  const { addTodo } = useTodos()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [category, setCategory] = useState("Work")
  const [dueDate, setDueDate] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate: dueDate || undefined,
      completed: false,
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
    setCategory("Work")
    setDueDate("")
    setIsOpen(false)
  }

  return (
    <div className="mb-6">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-5 w-5" />
          Add New Task
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-primary/20 bg-card p-4">
          <Input
            autoFocus
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            rows={2}
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Create Task
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
