"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                className="rounded-full p-2 w-10 h-10 hover:bg-[var(--muted)] transition-colors"
                aria-label="Toggle theme"
            >
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 w-10 h-10 hover:bg-[var(--muted)] transition-colors relative"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[var(--accent)]" />
            <Moon className="absolute h-5 w-5 top-2 left-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[var(--accent)]" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
