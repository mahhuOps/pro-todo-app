import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </main>
  )
}
