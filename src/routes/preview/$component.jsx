import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"

export const Route = createFileRoute("/preview/$component")({
  component: PreviewComponent,
})

function PreviewComponent() {
  const canvasRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, gridX: 0, gridY: 0 })
  const [showCoords, setShowCoords] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    // Set canvas size to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGrid()
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate origin point (25vw, 25vh from top-left)
      const originX = window.innerWidth * 0.25
      const originY = window.innerHeight * 0.25

      const minorTick = 10 // 10px minor tick
      const majorTick = 100 // 100px major tick

      // Draw minor ticks (10px grid)
      ctx.fillStyle = "rgba(156, 163, 175, 0.2)" // Lighter dots for minor ticks

      for (let x = originX % minorTick; x < canvas.width; x += minorTick) {
        for (let y = originY % minorTick; y < canvas.height; y += minorTick) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw major ticks (100px grid)
      ctx.fillStyle = "rgba(156, 163, 175, 0.5)" // Darker dots for major ticks

      for (let x = originX % majorTick; x < canvas.width; x += majorTick) {
        for (let y = originY % majorTick; y < canvas.height; y += majorTick) {
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw origin marker (0,0)
      ctx.fillStyle = "rgba(239, 68, 68, 0.8)" // Red color for origin
      ctx.beginPath()
      ctx.arc(originX, originY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Draw origin label
      ctx.fillStyle = "rgba(239, 68, 68, 1)"
      ctx.font = "12px monospace"
      ctx.fillText("(0, 0)", originX + 8, originY - 8)

      // Draw axis lines from origin
      ctx.strokeStyle = "rgba(239, 68, 68, 0.3)"
      ctx.lineWidth = 1

      // Horizontal line
      ctx.beginPath()
      ctx.moveTo(0, originY)
      ctx.lineTo(canvas.width, originY)
      ctx.stroke()

      // Vertical line
      ctx.beginPath()
      ctx.moveTo(originX, 0)
      ctx.lineTo(originX, canvas.height)
      ctx.stroke()
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const originX = window.innerWidth * 0.25
      const originY = window.innerHeight * 0.25

      // Calculate grid coordinates relative to origin
      const gridX = Math.round(x - originX)
      const gridY = Math.round(y - originY)

      setMousePos({ x, y, gridX, gridY })
      setShowCoords(true)
    }

    const handleMouseLeave = () => {
      setShowCoords(false)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg max-w-sm">
        <h2 className="text-lg font-bold text-foreground mb-2">Grid Preview</h2>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            • <span className="text-foreground font-medium">Origin (0,0):</span>{" "}
            25vw, 25vh
          </p>
          <p>
            • <span className="text-foreground font-medium">Major tick:</span>{" "}
            100px (darker dots)
          </p>
          <p>
            • <span className="text-foreground font-medium">Minor tick:</span>{" "}
            10px (lighter dots)
          </p>
          <p>
            • <span className="text-red-500 font-medium">Red marker:</span>{" "}
            Origin point
          </p>
        </div>
      </div>

      {/* Mouse coordinate display */}
      {showCoords && (
        <div
          className="absolute pointer-events-none bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg transform -translate-x-1/2 -translate-y-full -mt-2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}>
          <p className="text-xs font-mono text-foreground whitespace-nowrap">
            Grid: ({mousePos.gridX}, {mousePos.gridY})px
          </p>
        </div>
      )}

      {/* Coordinate display */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 shadow-lg">
        <div className="space-y-1">
          <p className="text-xs font-mono text-muted-foreground">
            Grid System Active
          </p>
          {showCoords && (
            <>
              <p className="text-xs font-mono text-foreground">
                Screen: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})
              </p>
              <p className="text-xs font-mono text-primary">
                Grid: ({mousePos.gridX}, {mousePos.gridY})
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
