import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-xl bg-warm-accent px-4 py-2 text-white hover:bg-warm-accent-hover active:bg-warm-accent-hover",
        destructive:
          "rounded-xl bg-warm-danger text-white shadow-sm hover:bg-warm-danger/90",
        outline:
          "rounded-xl border border-warm-border bg-warm-base text-warm-primary shadow-sm hover:border-warm-border-strong hover:bg-warm-subtle",
        secondary:
          "rounded-xl bg-warm-subtle text-warm-primary hover:bg-warm-muted",
        ghost:
          "rounded-xl text-warm-primary hover:bg-warm-subtle",
        link:
          "rounded-xl text-warm-accent underline-offset-4 hover:underline",
        edit:
          "rounded-xl bg-warm-secondary px-4 py-2 text-white hover:bg-warm-primary active:bg-warm-primary",
        delete:
          "rounded-xl bg-warm-danger px-4 py-2 text-white hover:bg-warm-danger/90 active:bg-warm-danger/80",
        cancel:
          "rounded-xl border border-warm-border bg-warm-base px-4 py-2 text-warm-secondary hover:bg-warm-subtle",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
