import React from 'react'
import { Info } from 'lucide-react'

function GridGuide() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Grid System Guide</h2>
      </div>

      {/* Visual representation */}
      <div className="mb-8 p-6 bg-muted/30 rounded-lg border border-border">
        <div className="relative aspect-video bg-background border border-border rounded overflow-hidden">
          {/* Viewport representation */}
          <div className="absolute inset-0">
            {/* Top-left corner label */}
            <div className="absolute top-2 left-2 text-xs font-mono text-muted-foreground">
              (0, 0) screen
            </div>

            {/* Origin marker */}
            <div 
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"
              style={{ left: '25%', top: '25%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-mono font-bold text-red-500">
                  (0, 0) grid
                </span>
              </div>
            </div>

            {/* Axis lines */}
            <div 
              className="absolute h-px bg-red-500/30"
              style={{ left: '25%', top: '0', bottom: '0', width: '1px' }}
            />
            <div 
              className="absolute w-full bg-red-500/30"
              style={{ top: '25%', left: '0', right: '0', height: '1px' }}
            />

            {/* Dimension labels */}
            <div 
              className="absolute top-1/2 text-xs font-mono text-muted-foreground"
              style={{ left: '12.5%', transform: 'translateY(-50%)' }}
            >
              25vw
            </div>
            <div 
              className="absolute left-1/2 text-xs font-mono text-muted-foreground"
              style={{ top: '12.5%', transform: 'translateX(-50%)' }}
            >
              25vh
            </div>

            {/* Grid pattern visualization */}
            <div 
              className="absolute bg-gradient-to-br from-primary/5 to-transparent"
              style={{ 
                left: '25%', 
                top: '25%', 
                right: '0', 
                bottom: '0',
                backgroundImage: 'radial-gradient(circle, rgba(156, 163, 175, 0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Visual representation of grid origin at 25vw, 25vh from viewport top-left
        </p>
      </div>

      {/* Specifications table */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-background border border-border rounded-lg">
          <h3 className="text-sm font-semibold text-foreground mb-3">Grid Ticks</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400/20" />
              <span className="text-muted-foreground">Minor: </span>
              <span className="font-mono text-foreground">10px</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400/50" />
              <span className="text-muted-foreground">Major: </span>
              <span className="font-mono text-foreground">100px</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-background border border-border rounded-lg">
          <h3 className="text-sm font-semibold text-foreground mb-3">Origin Point</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">X: </span>
              <span className="font-mono text-foreground">25vw</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Y: </span>
              <span className="font-mono text-foreground">25vh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coordinate example */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="text-sm font-semibold text-foreground mb-2">Coordinate Example</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>On a <span className="font-mono text-foreground">1920x1080</span> screen:</p>
          <p className="pl-4">• Origin is at screen coordinates <span className="font-mono text-foreground">(480, 270)</span></p>
          <p className="pl-4">• Mouse at screen <span className="font-mono text-foreground">(580, 370)</span> = Grid <span className="font-mono text-primary">(100, 100)</span></p>
        </div>
      </div>
    </div>
  )
}

export default GridGuide