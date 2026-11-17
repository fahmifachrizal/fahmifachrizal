import { cn } from "@/lib/utils"

// Typographic logotype: the name stacked in heavy caps, the role in light.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-[0.85]", className)}>
      <span className="font-black uppercase tracking-tighter">Fahmi</span>
      <span className="font-black uppercase tracking-tighter">Fachrizal</span>
      <span className="mt-[0.15em] font-light tracking-tight">
        Full Stack Developer
      </span>
    </span>
  )
}
