import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-orange-900 border border-orange-500 text-white text-md px-4 py-2 hover:bg-orange-600 hover:transition hover:translate-y-0.5 ",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:    "text-md px-4 py-2 hover:bg-gray-800",
        link:     "text-white text-md px-4 py-2 underline-offset-4 hover:underline",
        success:  "bg-emerald-900 border border-emerald-500 text-white text-md px-4 py-2 hover:bg-emerald-600 hover:transition hover:translate-y-0.5",
        edit:     "bg-blue-900 border border-blue-500 text-white text-md px-4 py-2 hover:bg-blue-600 hover:transition hover:translate-y-0.5",
        delete:   "bg-red-900 border border-red-500 text-white text-md px-4 py-2 hover:bg-red-600 hover:transition hover:translate-y-0.5",
        cancel:   "bg-gray-900 border border-gray-500 text-white text-md px-4 py-2 hover:bg-gray-600 hover:transition hover:translate-y-0.5 ",
      },
      size: {
        default: "h-10 px-6 py-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
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
