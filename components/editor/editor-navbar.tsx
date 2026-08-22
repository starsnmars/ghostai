"use client"

import {
  PanelLeftClose as PaneLeftClose,
  PanelLeftOpen as PaneLeftOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
}

export function EditorNavbar({
  isSidebarOpen,
  onSidebarToggle,
}: EditorNavbarProps) {
  const SidebarIcon = isSidebarOpen ? PaneLeftClose : PaneLeftOpen

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-border bg-background px-3">
      <div className="flex flex-1 items-center">
        <Button
          aria-label={
            isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar"
          }
          onClick={onSidebarToggle}
          size="icon"
          title={
            isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar"
          }
          variant="ghost"
        >
          <SidebarIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-1 justify-center" />
      <div className="flex flex-1 justify-end" />
    </nav>
  )
}