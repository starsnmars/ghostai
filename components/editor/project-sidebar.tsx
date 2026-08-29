"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Renders a sidebar for browsing projects and initiating project creation.
 *
 * @param isOpen - Whether the sidebar is visible
 * @param onClose - Callback invoked when the sidebar close button is clicked
 */
export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={`fixed bottom-0 left-0 top-14 z-30 flex w-80 flex-col border-r border-[var(--border-default)] bg-[var(--bg-surface)]/95 shadow-2xl backdrop-blur-sm transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-14 items-center justify-between border-b border-[var(--border-default)] px-4">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Projects</h2>
        <Button
          aria-label="Close projects sidebar"
          className="h-8 w-8 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
          onClick={onClose}
          size="icon"
          title="Close projects sidebar"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs className="flex min-h-0 flex-1 flex-col gap-0" defaultValue="my-projects">
        <TabsList className="mx-4 mt-4 w-auto justify-start border-b border-[var(--border-default)] bg-transparent p-0 pb-2" variant="line">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex flex-1 items-center justify-center px-4 text-[var(--text-muted)]"
          value="my-projects"
        >
          No projects yet
        </TabsContent>
        <TabsContent
          className="flex flex-1 items-center justify-center px-4 text-[var(--text-muted)]"
          value="shared"
        >
          No shared projects yet
        </TabsContent>
      </Tabs>

      <div className="border-t border-[var(--border-default)] p-4">
        <Button className="w-full rounded-xl bg-[var(--accent-primary)] text-[var(--bg-base)] hover:opacity-90" type="button">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}