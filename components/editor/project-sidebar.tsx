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

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={`fixed top-14 bottom-0 left-0 z-30 flex w-80 flex-col border-r border-border bg-background/95 shadow-2xl backdrop-blur-sm transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <h2 className="text-sm font-semibold text-foreground">Projects</h2>
        <Button
          aria-label="Close projects sidebar"
          onClick={onClose}
          size="icon"
          title="Close projects sidebar"
          variant="ghost"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs className="flex min-h-0 flex-1 gap-0" defaultValue="my-projects">
        <TabsList className="mx-4 mt-4 w-auto" variant="line">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex items-center justify-center px-4 text-muted-foreground"
          value="my-projects"
        >
          No projects yet
        </TabsContent>
        <TabsContent
          className="flex items-center justify-center px-4 text-muted-foreground"
          value="shared"
        >
          No shared projects yet
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-4">
        <Button className="w-full" type="button">
          <Plus className="h-5 w-5" />
          New Project
        </Button>
      </div>
    </aside>
  )
}