"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface PresentationProps {
    children: React.ReactNode
}

export function Presentation({ children }: PresentationProps) {
    const [currentStep, setCurrentStep] = React.useState(0)

    // Filter children to remove whitespace/nulls
    const steps = React.Children.toArray(children).filter(Boolean)
    const totalSteps = steps.length

    const next = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
    const prev = () => setCurrentStep((prev) => Math.max(prev - 0, 0))

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [totalSteps])

    return (
        <div
            className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen h-[calc(100vh-4rem)] bg-background border-y my-12"
        >
            <div className="container mx-auto h-full flex flex-col">
                {/* Slide Content Area */}
                <div className="flex-1 flex flex-col justify-center px-4 md:px-8 overflow-y-auto">
                    <div className="prose dark:prose-invert max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {steps[currentStep]}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between border-t bg-muted/30 backdrop-blur px-8 py-4">
                    <span className="text-sm text-muted-foreground font-medium">
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            disabled={currentStep === 0}
                            className="p-2 disabled:opacity-30 hover:bg-accent hover:text-accent-foreground rounded-md border transition-colors"
                            aria-label="Previous step"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <button
                            onClick={next}
                            disabled={currentStep === totalSteps - 1}
                            className="p-2 disabled:opacity-30 hover:bg-accent hover:text-accent-foreground rounded-md border transition-colors"
                            aria-label="Next step"
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}