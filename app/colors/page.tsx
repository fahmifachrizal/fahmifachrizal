interface ColorItem {
  name: string
  cssVar: string
  textVar?: string
  category: string
}

const colorPalette: ColorItem[] = [
  // Base Colors
  {
    name: "Background",
    cssVar: "bg-background",
    textVar: "text-foreground",
    category: "Base",
  },
  { name: "Foreground", cssVar: "bg-foreground", category: "Base" },

  // Card Colors
  {
    name: "Card",
    cssVar: "bg-card",
    textVar: "text-card-foreground",
    category: "Card",
  },
  { name: "Card Foreground", cssVar: "bg-card-foreground", category: "Card" },

  // Popover Colors
  {
    name: "Popover",
    cssVar: "bg-popover",
    textVar: "text-popover-foreground",
    category: "Popover",
  },
  {
    name: "Popover Foreground",
    cssVar: "bg-popover-foreground",
    category: "Popover",
  },

  // Primary Colors
  {
    name: "Primary",
    cssVar: "bg-primary",
    textVar: "text-primary-foreground",
    category: "Primary",
  },
  {
    name: "Primary Foreground",
    cssVar: "bg-primary-foreground",
    category: "Primary",
  },

  // Secondary Colors
  {
    name: "Secondary",
    cssVar: "bg-secondary",
    textVar: "text-secondary-foreground",
    category: "Secondary",
  },
  {
    name: "Secondary Foreground",
    cssVar: "bg-secondary-foreground",
    category: "Secondary",
  },

  // Muted Colors
  {
    name: "Muted",
    cssVar: "bg-muted",
    textVar: "text-muted-foreground",
    category: "Muted",
  },
  {
    name: "Muted Foreground",
    cssVar: "bg-muted-foreground",
    category: "Muted",
  },

  // Accent Colors
  {
    name: "Accent",
    cssVar: "bg-accent",
    textVar: "text-accent-foreground",
    category: "Accent",
  },
  {
    name: "Accent Foreground",
    cssVar: "bg-accent-foreground",
    category: "Accent",
  },

  // Destructive Colors
  {
    name: "Destructive",
    cssVar: "bg-destructive",
    textVar: "text-white",
    category: "Destructive",
  },

  // Border & Input
  { name: "Border", cssVar: "bg-border", category: "Border & Input" },
  { name: "Input", cssVar: "bg-input", category: "Border & Input" },
  { name: "Ring", cssVar: "bg-ring", category: "Border & Input" },

  // Chart Colors
  { name: "Chart 1", cssVar: "bg-chart-1", category: "Charts" },
  { name: "Chart 2", cssVar: "bg-chart-2", category: "Charts" },
  { name: "Chart 3", cssVar: "bg-chart-3", category: "Charts" },
  { name: "Chart 4", cssVar: "bg-chart-4", category: "Charts" },
  { name: "Chart 5", cssVar: "bg-chart-5", category: "Charts" },

  // Sidebar Colors
  {
    name: "Sidebar",
    cssVar: "bg-sidebar",
    textVar: "text-sidebar-foreground",
    category: "Sidebar",
  },
  {
    name: "Sidebar Foreground",
    cssVar: "bg-sidebar-foreground",
    category: "Sidebar",
  },
  {
    name: "Sidebar Primary",
    cssVar: "bg-sidebar-primary",
    textVar: "text-sidebar-primary-foreground",
    category: "Sidebar",
  },
  {
    name: "Sidebar Primary Foreground",
    cssVar: "bg-sidebar-primary-foreground",
    category: "Sidebar",
  },
  {
    name: "Sidebar Accent",
    cssVar: "bg-sidebar-accent",
    textVar: "text-sidebar-accent-foreground",
    category: "Sidebar",
  },
  {
    name: "Sidebar Accent Foreground",
    cssVar: "bg-sidebar-accent-foreground",
    category: "Sidebar",
  },
  { name: "Sidebar Border", cssVar: "bg-sidebar-border", category: "Sidebar" },
  { name: "Sidebar Ring", cssVar: "bg-sidebar-ring", category: "Sidebar" },
]

function ColorCard({ color }: { color: ColorItem }) {
  return (
    <div className="group overflow-hidden rounded-xl border-2 border-border bg-card shadow-md transition-all hover:border-primary/50">
      {/* Color Preview */}
      <div
        className={`h-40 w-full relative ${color.cssVar} ${
          color.textVar || ""
        } flex items-center justify-center`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />

        {/* Text preview if textVar exists */}
        {color.textVar && (
          <div className="relative z-10 text-center px-4">
            <p className="text-2xl font-bold mb-1">Aa</p>
            <p className="text-sm opacity-80">Sample Text</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-bold text-card-foreground">{color.name}</h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`h-6 w-6 rounded-md border-2 border-border shrink-0 ${color.cssVar}`}
            />
            <code className="flex-1 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground font-mono">
              {color.cssVar}
            </code>
          </div>
          {color.textVar && (
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 rounded-md border-2 border-border shrink-0 flex items-center justify-center text-[8px] font-bold ${color.cssVar} ${color.textVar}`}>
                Aa
              </div>
              <code className="flex-1 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground font-mono">
                {color.textVar}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ColorPalettePage() {
  const categories = Array.from(new Set(colorPalette.map((c) => c.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 bg-card/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-1 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h1 className="text-5xl font-black text-foreground tracking-tight">
                Design System Colors
              </h1>
              <p className="mt-3 text-xl text-muted-foreground">
                Your complete color palette with foreground text previews
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Color Grid */}
      <main className="relative container mx-auto px-6 py-16">
        {categories.map((category) => (
          <section
            key={category}
            className="mb-16 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-foreground">{category}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {colorPalette
                .filter((color) => color.category === category)
                .map((color) => (
                  <ColorCard key={color.cssVar} color={color} />
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-xl py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Cards with text show the background + foreground color pairing
          </p>
        </div>
      </footer>
    </div>
  )
}
