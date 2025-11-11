import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { createFileRoute } from "@tanstack/react-router"
import { Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export const Route = createFileRoute("/preview/$component")({
  component: PreviewComponent,
})

export default function PreviewComponent() {
  const canvasRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, gridX: 0, gridY: 0 })
  const [showCoords, setShowCoords] = useState(false)
  const { theme, setTheme } = useTheme()

  // Mock component data - replace with actual component logic later
  const [component, _] = useState({ x: 100, y: 100, width: 300, height: 200 })
  // Example: setComponent({ x: 100, y: 100, width: 300, height: 200 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGrid()
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate origin point - center if no component, component top-left if present
      let originX, originY

      if (component) {
        originX = component.x
        originY = component.y
      } else {
        originX = window.innerWidth * 0.5
        originY = window.innerHeight * 0.5
      }

      const minorTick = 10
      const majorTick = 100

      // Determine colors based on theme
      const isDark = document.documentElement.classList.contains("dark")
      const minorColor = isDark
        ? "rgba(156, 163, 175, 0.2)"
        : "rgba(100, 116, 139, 0.2)"
      const majorColor = isDark
        ? "rgba(156, 163, 175, 0.5)"
        : "rgba(100, 116, 139, 0.5)"
      const originColor = isDark
        ? "rgba(239, 68, 68, 0.8)"
        : "rgba(220, 38, 38, 0.8)"
      const axisColor = isDark
        ? "rgba(239, 68, 68, 0.3)"
        : "rgba(220, 38, 38, 0.3)"

      // Draw minor ticks
      ctx.fillStyle = minorColor
      for (let x = originX % minorTick; x < canvas.width; x += minorTick) {
        for (let y = originY % minorTick; y < canvas.height; y += minorTick) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw major ticks
      ctx.fillStyle = majorColor
      for (let x = originX % majorTick; x < canvas.width; x += majorTick) {
        for (let y = originY % majorTick; y < canvas.height; y += majorTick) {
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw component border if present
      if (component) {
        ctx.strokeStyle = isDark
          ? "rgba(59, 130, 246, 0.6)"
          : "rgba(37, 99, 235, 0.6)"
        ctx.lineWidth = 2
        ctx.strokeRect(
          component.x,
          component.y,
          component.width,
          component.height
        )
      }

      // Draw origin marker
      ctx.fillStyle = originColor
      ctx.beginPath()
      ctx.arc(originX, originY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Draw axis lines from origin
      ctx.strokeStyle = axisColor
      ctx.lineWidth = 1

      ctx.beginPath()
      ctx.moveTo(0, originY)
      ctx.lineTo(canvas.width, originY)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(originX, 0)
      ctx.lineTo(originX, canvas.height)
      ctx.stroke()
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let originX, originY

      if (component) {
        originX = component.x
        originY = component.y
      } else {
        originX = window.innerWidth * 0.5
        originY = window.innerHeight * 0.5
      }

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
  }, [component, theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="bg-card/90 backdrop-blur-sm shadow-lg">
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* X Coordinate - Top */}
      {showCoords && (
        <div
          className="absolute"
          style={{ left: mousePos.x, transform: "translateX(-50%)" }}>
          <p className="text-sm font-mono text-foreground whitespace-nowrap">
            <span className="">{mousePos.gridX}</span>
          </p>
        </div>
      )}

      {/* Y Coordinate - Left */}
      {showCoords && (
        <div
          className="absolute"
          style={{
            top: mousePos.y,
            left: 0,
            transform: "translateY(-50%) rotate(-90deg)",
          }}>
          <p className="text-sm font-mono text-foreground whitespace-nowrap">
            <span className="">{mousePos.y}</span>
          </p>
        </div>
      )}
    </div>
  )
}
