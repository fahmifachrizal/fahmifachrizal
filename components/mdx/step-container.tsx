"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft, Maximize, Minimize, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PresentationProps {
    children: React.ReactNode
}

export function Presentation({ children }: PresentationProps) {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [direction, setDirection] = React.useState<"forward" | "backward">("forward")
    const [isAnimating, setIsAnimating] = React.useState(false)
    const [isFullscreen, setIsFullscreen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const slideAreaRef = React.useRef<HTMLDivElement>(null)
    const fitRef = React.useRef<HTMLDivElement>(null)
    const [fit, setFit] = React.useState({ scale: 1, height: 0 })

    // Filter children to remove whitespace/nulls
    const steps = React.Children.toArray(children).filter(Boolean)
    const totalSteps = steps.length

    const next = () => {
        if (currentStep < totalSteps - 1 && !isAnimating) {
            setDirection("forward")
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1)
                setIsAnimating(false)
            }, 150)
        }
    }

    const prev = () => {
        if (currentStep > 0 && !isAnimating) {
            setDirection("backward")
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentStep((prev) => prev - 1)
                setIsAnimating(false)
            }, 150)
        }
    }

    const [isPresentationMode, setIsPresentationMode] = React.useState(false)

    const enterPresentation = () => {
        setIsPresentationMode(true)
        setIsFullscreen(true)
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
    }

    const exitPresentation = () => {
        setIsPresentationMode(false)
        setIsFullscreen(false)
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => {
                console.error(`Error attempting to exit fullscreen: ${err.message}`)
            })
        }
    }

    // CSS-based Fullscreen toggle (Maximized view)
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            setIsFullscreen(true)
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
        } else {
            setIsFullscreen(false)
            if (document.fullscreenElement) {
                document.exitFullscreen().catch((err) => {
                    console.error(`Error attempting to exit fullscreen: ${err.message}`)
                })
            }
        }
    }

    // Sync state with browser fullscreen changes (e.g. user presses Esc)
    React.useEffect(() => {
        const handleFullscreenChange = () => {
            const isNativeFullscreen = !!document.fullscreenElement
            setIsFullscreen(isNativeFullscreen)
            // If we exited native fullscreen, also exit presentation mode to return to blog view
            if (!isNativeFullscreen) {
                setIsPresentationMode(false)
            }
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    // Keyboard navigation
    React.useEffect(() => {
        if (!isPresentationMode) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
            // F key for fullscreen toggle
            if (e.key === "f" || e.key === "F") {
                e.preventDefault()
                toggleFullscreen()
            }
            if (e.key === "Escape") {
                // If in native fullscreen, let the browser handle it first (it triggers fullscreenchange)
                // If not in native fullscreen but in presentation mode, exit presentation
                if (!document.fullscreenElement) {
                    exitPresentation()
                }
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [currentStep, isAnimating, totalSteps, isFullscreen, isPresentationMode])

    // Slides never scroll: a slide taller than the slide area is scaled down to
    // fit it. Transforms don't change layout size, so offsetHeight is always the
    // slide's natural height; the observer re-fits on resize and image loads.
    React.useLayoutEffect(() => {
        const area = slideAreaRef.current
        const content = fitRef.current
        if (!isPresentationMode || !area || !content) return
        const measure = () => {
            const height = content.offsetHeight
            const scale = height > 0 ? Math.min(1, area.clientHeight / height) : 1
            setFit((f) => (f.scale === scale && f.height === height ? f : { scale, height }))
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(area)
        observer.observe(content)
        return () => observer.disconnect()
    }, [currentStep, isPresentationMode])

    // Disable body scroll when formatted as presentation (fullscreen)
    React.useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isFullscreen])

    if (!isPresentationMode) {
        return (
            <div className="my-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-6 p-6 border bg-card">
                    <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <div className="flex items-center justify-center size-6 rounded-full bg-foreground/10 text-foreground">
                                <Info className="size-3.5" />
                            </div>
                            Reading Mode
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            You are reading this as a blog post. Navigate sections using the table of contents or switch to an interactive slide deck experience.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        <Button onClick={enterPresentation} className="w-full gap-2" size="lg">
                            <Maximize className="size-4" />
                            Start Presentation
                        </Button>
                        <div className="text-xs text-center text-muted-foreground">
                            {totalSteps} slides • 15 min read
                        </div>
                    </div>
                </div>

                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <div key={index} className="scroll-mt-24 border-b pb-12 last:border-0 last:pb-0">
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative border-y my-12 overflow-hidden transition-all duration-300",
                isFullscreen
                    ? "fixed inset-0 z-[60] my-0 border-0 bg-background w-screen h-dvh"
                    : "w-full h-[600px] md:h-[700px] lg:h-[800px] bg-card"
            )}
        >
            <div className={cn(
                "h-full flex flex-col relative z-10",
                isFullscreen ? "container mx-auto" : "w-full"
            )}>
                {/* Slide content area: the slide is centred, and scaled down when
                    it is taller than the area, so it never scrolls or clips. */}
                <div
                    ref={slideAreaRef}
                    className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32"
                >
                    <div className="w-full" style={{ height: fit.height ? fit.height * fit.scale : undefined }}>
                    <div
                        ref={fitRef}
                        className="w-full py-8 md:py-12"
                        style={{ transform: `scale(${fit.scale})`, transformOrigin: "top center" }}
                    >
                        {/* Slide with transitions */}
                        <div
                            key={currentStep}
                            className={cn(
                                "prose prose-lg max-w-5xl mx-auto w-full transition-all duration-500 ease-out",
                                isAnimating && direction === "forward" && "animate-out fade-out-0 slide-out-to-left-8",
                                isAnimating && direction === "backward" && "animate-out fade-out-0 slide-out-to-right-8",
                                !isAnimating && "animate-in fade-in-0 slide-in-from-right-8 duration-500"
                            )}
                        >
                            {steps[currentStep]}
                        </div>
                    </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex w-full shrink-0 items-center justify-between gap-6 border-t bg-background px-6 py-4 md:px-8">
                    <div className={cn("flex items-center gap-4", isFullscreen && "hidden md:flex")}>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground font-medium">
                                Slide {currentStep + 1} of {totalSteps}
                            </span>
                            <span className="text-xs text-muted-foreground/50 hidden md:block">
                                Press ← or → to navigate
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        if (i !== currentStep && !isAnimating) {
                                            setDirection(i > currentStep ? "forward" : "backward")
                                            setIsAnimating(true)
                                            setTimeout(() => {
                                                setCurrentStep(i)
                                                setIsAnimating(false)
                                            }, 150)
                                        }
                                    }}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i === currentStep ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    )}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 ml-auto">
                        {/* Exit button */}
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={exitPresentation}
                            className="transition-transform hover:scale-105 active:scale-95"
                            aria-label="Exit presentation"
                            title="Exit presentation (Esc)"
                        >
                            <Minimize className="size-5" />
                        </Button>

                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={prev}
                            disabled={currentStep === 0}
                            className="transition-transform hover:scale-105 active:scale-95"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={next}
                            disabled={currentStep === totalSteps - 1}
                            className="transition-transform hover:scale-105 active:scale-95"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}