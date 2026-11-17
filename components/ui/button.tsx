import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Ink & Paper buttons: square, flat, no shadow at rest. `default` is the
// solid ink rectangle; `link` is the secondary action (text, arrow, underline
// on hover). Inside a `.surface-ink` section the tokens invert, so the same
// variants render paper-on-ink without extra classes.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-colors duration-300 ease-(--ease-out-expo) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        destructive: "bg-destructive text-paper hover:bg-destructive/90",
        outline:
          "border border-foreground/30 bg-transparent text-foreground hover:border-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-foreground/10",
        ghost: "hover:bg-foreground/5",
        link: "group/link text-foreground underline-offset-[6px] decoration-1 hover:underline [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-1",
      },
      size: {
        default: "h-10 px-6 has-[>svg]:px-5",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-8 has-[>svg]:px-7",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        class: "h-auto px-0 py-1 has-[>svg]:px-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
