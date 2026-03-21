import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "mr-2 inline-flex rounded-xl border px-3 py-1 text-xs font-semibold opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-warm-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-warm-border bg-warm-subtle text-warm-primary hover:bg-warm-muted",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-warm-danger text-white shadow hover:bg-warm-danger/80",
        outline:
          "border-warm-border text-warm-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
