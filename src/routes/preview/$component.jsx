import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { createFileRoute } from "@tanstack/react-router"
import { Moon, Sun, AlertCircle } from "lucide-react"
import { useEffect, useRef, useState, lazy, Suspense } from "react"

export const Route = createFileRoute("/preview/$component")({
  component: PreviewComponent,
})

// Component loader function
const loadComponent = (componentName) => {
  return lazy(() => 
    import(`../../components/${componentName}.jsx`)
      .catch(() => import(`../../components/error-component.jsx`))
  )
}

export default function PreviewComponent() {
  const { component: componentParam } = Route.useParams()
  const canvasRef = useRef(null)
  const componentRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, gridX: 0, gridY: 0, isInside: false })
  const [showCoords, setShowCoords] = useState(false)
  const [componentBounds, setComponentBounds] = useState(null)
  const { theme, setTheme } = useTheme()

  // Load component dynamically
  const [DynamicComponent, setDynamicComponent] = useState(null)
  
  useEffect(() => {
    if (componentParam) {
      const Component = loadComponent(componentParam)
      setDynamicComponent(() => Component)
    }
  }, [componentParam])

  // Update component bounds when component loads or window resizes
  useEffect(() => {
    const updateBounds = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect()
        setComponentBounds({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        })
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)
    
    // Use MutationObserver to detect when component renders
    const observer = new MutationObserver(updateBounds)
    if (componentRef.current) {
      observer.observe(componentRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true 
      })
    }

    return () => {
      window.removeEventListener('resize', updateBounds)
      observer.disconnect()
    }
  }, [DynamicComponent])

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

      // Calculate origin point - component top-left if loaded, otherwise center
      let originX, originY
      
      if (componentBounds) {
        originX = componentBounds.x
        originY = componentBounds.y
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
      const guideColor = isDark
        ? "rgba(59, 130, 246, 0.6)"
        : "rgba(37, 99, 235, 0.6)"

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

      // Draw component guide lines if component bounds exist
      if (componentBounds) {
        ctx.strokeStyle = guideColor
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])

        // Vertical guide lines (left and right edges)
        ctx.beginPath()
        ctx.moveTo(componentBounds.x, 0)
        ctx.lineTo(componentBounds.x, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(componentBounds.x + componentBounds.width, 0)
        ctx.lineTo(componentBounds.x + componentBounds.width, canvas.height)
        ctx.stroke()

        // Horizontal guide lines (top and bottom edges)
        ctx.beginPath()
        ctx.moveTo(0, componentBounds.y)
        ctx.lineTo(canvas.width, componentBounds.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, componentBounds.y + componentBounds.height)
        ctx.lineTo(canvas.width, componentBounds.y + componentBounds.height)
        ctx.stroke()

        ctx.setLineDash([])
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let originX, originY
      
      if (componentBounds) {
        originX = componentBounds.x
        originY = componentBounds.y
      } else {
        originX = window.innerWidth * 0.5
        originY = window.innerHeight * 0.5
      }

      const gridX = Math.round(x - originX)
      const gridY = Math.round(y - originY)

      // Check if mouse is inside component bounds
      const isInside = componentBounds ? (
        x >= componentBounds.x && 
        x <= componentBounds.x + componentBounds.width &&
        y >= componentBounds.y && 
        y <= componentBounds.y + componentBounds.height
      ) : false

      setMousePos({ x, y, gridX, gridY, isInside })
      setShowCoords(true)
    }

    const handleMouseLeave = () => {
      setShowCoords(false)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [componentBounds, theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Component Container - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div ref={componentRef} className="pointer-events-auto">
          {DynamicComponent ? (
            <Suspense fallback={
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <DynamicComponent />
            </Suspense>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-card border border-border rounded-lg">
              <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No Component Specified
              </h2>
              <p className="text-muted-foreground">
                Navigate to /preview/component-name to view a component
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-10">
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

      {/* Mouse coordinate overlays */}
      {showCoords && (
        <>
          {/* X coordinate (top center) */}
          <div
            className={`px-1 absolute z-9999 pointer-events-none transition-colors ${
              mousePos.isInside
                ? "text-secondary-foreground"
                : "bg-card/90 text-foreground"
            }`}
            style={{
              left: mousePos.x,
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-xs font-mono font-semibold">
              {Math.round(mousePos.gridX)}px
            </span>
          </div>

          {/* Y coordinate (left side, rotated) */}
          <div
            className={`px-1 absolute z-9999 pointer-events-none transition-colors ${
              mousePos.isInside
                ? "text-secondary-foreground"
                : "bg-card/90 text-foreground"
            }`}
            style={{
              top: mousePos.y,
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "center",
            }}
          >
            <span className="text-xs font-mono font-semibold">
              {Math.round(mousePos.gridY)}px
            </span>
          </div>
        </>
      )}
    </div>
  )
}