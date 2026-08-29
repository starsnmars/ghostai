"use client"

import {
  PanelLeftClose as PaneLeftClose,
  PanelLeftOpen as PaneLeftOpen,
} from "lucide-react"
import { UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
}

/**
 * Renders the editor navigation bar with sidebar controls and user account actions.
 *
 * @param isSidebarOpen - Whether the projects sidebar is currently open
 * @param onSidebarToggle - Handles toggling the projects sidebar
 * @returns The editor navigation bar
 */
export function EditorNavbar({
  isSidebarOpen,
  onSidebarToggle,
}: EditorNavbarProps) {
  const SidebarIcon = isSidebarOpen ? PaneLeftClose : PaneLeftOpen

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-base)]/90 px-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button
          aria-label={
            isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar"
          }
          className="h-9 w-9 rounded-lg border border-transparent text-[var(--text-primary)] hover:border-[var(--border-default)] hover:bg-[var(--bg-subtle)]"
          onClick={onSidebarToggle}
          size="icon"
          title={
            isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar"
          }
          variant="ghost"
        >
          <SidebarIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
              userButtonPopoverCard: "border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)]",
              userButtonPopoverActionButton: "text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]",
              userButtonPopoverActionButtonText: "text-[var(--text-primary)]",
            },
          }}
        />
      </div>
    </nav>
  )
}