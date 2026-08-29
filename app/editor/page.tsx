/**
 * Renders the Ghost AI Editor welcome screen.
 */
export default function EditorPage() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Ghost AI Editor</h1>
        <p className="text-muted-foreground">
          Create your first project to get started
        </p>
      </div>
    </div>
  );
}
