"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-muted-foreground mb-6">Something went wrong. Please try again.</p>
            {process.env.NODE_ENV === "development" && error.message && (
              <p className="mb-6 text-sm text-destructive bg-destructive/10 p-4 rounded">{error.message}</p>
            )}
            <button
              onClick={reset}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
