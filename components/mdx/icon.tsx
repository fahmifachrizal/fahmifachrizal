import {
  Award,
  Boxes,
  Briefcase,
  ChartColumn,
  Check,
  Code,
  GraduationCap,
  Laptop,
  Map as MapIcon,
  Network,
  Package,
  Rocket,
  Ruler,
  ShieldCheck,
  TriangleAlert,
  Trophy,
  Users,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Flat line icons for MDX content, in place of emoji. Usage:
// <Icon name="rocket" /> (decorative) or <Icon name="check" label="Yes" />.
const icons = {
  award: Award,
  boxes: Boxes,
  briefcase: Briefcase,
  chart: ChartColumn,
  check: Check,
  code: Code,
  "graduation-cap": GraduationCap,
  laptop: Laptop,
  map: MapIcon,
  network: Network,
  package: Package,
  rocket: Rocket,
  ruler: Ruler,
  shield: ShieldCheck,
  alert: TriangleAlert,
  trophy: Trophy,
  users: Users,
  wrench: Wrench,
  x: X,
  zap: Zap,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

export function Icon({
  name,
  label,
  className,
}: {
  name: IconName
  label?: string
  className?: string
}) {
  const Glyph = icons[name]
  return (
    <Glyph
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      strokeWidth={1.75}
      className={cn("inline-block size-[1em] shrink-0 align-[-0.125em]", className)}
    />
  )
}
