import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 active:bg-orange-700",
        destructive:
          "rounded-md bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "rounded-md border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-zinc-300 hover:bg-zinc-50",
        secondary:
          "rounded-md bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        ghost:    "rounded-md text-zinc-900 hover:bg-zinc-100",
        link:     "rounded-md text-orange-500 underline-offset-4 hover:underline",
        success:  "rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 active:bg-emerald-800",
        edit:     "rounded-md bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-800 active:bg-zinc-900",
        delete:   "rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 active:bg-red-800",
        cancel:   "rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-700 hover:bg-zinc-50",
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
