import { createFileRoute, Link } from '@tanstack/react-router'
import { Grid3x3, Info, BookOpen } from 'lucide-react'
import { Button } from '../../components/ui/button'
import GridGuide from '../../components/grid-guide'

export const Route = createFileRoute('/preview/')({
  component: PreviewIndex,
})

function PreviewIndex() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Grid Preview System
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive dotted grid with precise measurements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid Preview Card */}
          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Grid3x3 className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Dotted Grid
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Interactive grid with 100px major ticks and 10px minor ticks. Origin at 25vw, 25vh.
            </p>
            
            <Link to="/preview/grid">
              <Button className="w-full">
                <Grid3x3 className="w-4 h-4 mr-2" />
                View Grid
              </Button>
            </Link>
          </div>

          {/* Specifications Card */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Info className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Grid Specifications
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-muted-foreground">Origin Point</span>
                <span className="font-mono text-foreground">25vw, 25vh</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-muted-foreground">Major Tick Gap</span>
                <span className="font-mono text-foreground">100px</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-muted-foreground">Minor Tick Gap</span>
                <span className="font-mono text-foreground">10px</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-muted-foreground">Grid Style</span>
                <span className="font-mono text-foreground">Dotted</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Coordinate System</span>
                <span className="font-mono text-foreground">Cartesian</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg bg-card/50">
            <h4 className="font-semibold text-foreground mb-2">Responsive</h4>
            <p className="text-xs text-muted-foreground">
              Grid automatically adjusts to viewport size
            </p>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-card/50">
            <h4 className="font-semibold text-foreground mb-2">Visual Origin</h4>
            <p className="text-xs text-muted-foreground">
              Red marker and axis lines show (0,0) point
            </p>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-card/50">
            <h4 className="font-semibold text-foreground mb-2">Mouse Tracking</h4>
            <p className="text-xs text-muted-foreground">
              Real-time coordinate display on hover
            </p>
          </div>
        </div>

        {/* Visual Guide */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Understanding the Grid
            </h2>
          </div>
          <GridGuide />
        </div>

        {/* Back to Home */}
        <div className="text-center pt-4">
          <Link to="/">
            <Button variant="outline">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}