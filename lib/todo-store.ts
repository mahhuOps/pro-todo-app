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

const STORAGE_KEY = "todos-pro-max"

export const todoStore = {
  getTodos: (): Todo[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  addTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">): Todo => {
    const newTodo: Todo = {
      ...todo,
      id: `todo-${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const todos = todoStore.getTodos()
    todos.push(newTodo)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    return newTodo
  },

  updateTodo: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>): Todo | null => {
    const todos = todoStore.getTodos()
    const index = todos.findIndex((t) => t.id === id)
    if (index === -1) return null

    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    return todos[index]
  },

  deleteTodo: (id: string): boolean => {
    const todos = todoStore.getTodos()
    const filtered = todos.filter((t) => t.id !== id)
    if (filtered.length === todos.length) return false
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  },

  getStats: () => {
    const todos = todoStore.getTodos()
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      pending: todos.filter((t) => !t.completed).length,
      urgent: todos.filter((t) => t.priority === "urgent" && !t.completed).length,
    }
  },
}
