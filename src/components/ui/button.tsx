 "use client"
 
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-none",
                destructive: "bg-red-500 text-destructive-foreground hover:bg-red-500/90 rounded-none",
                outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-black rounded-none uppercase italic",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-none",
                ghost: "hover:bg-primary/10 hover:text-primary rounded-none",
                link: "text-primary underline-offset-4 hover:underline",
                striking: "group relative bg-primary text-black px-12 py-8 overflow-hidden rounded-none skew-x-[-12deg] hover:skew-x-0 transition-transform duration-500 shadow-[8px_8px_0px_#fafafa] hover:shadow-none translate-x-[-4px] translate-y-[-4px] hover:translate-x-0 hover:translate-y-0",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-9 px-3",
                lg: "h-16 px-12 text-lg italic uppercase tracking-tighter",
                icon: "h-12 w-12",
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
    ripple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ripple = true, ...props }, ref) => {
        const Comp: React.ElementType = asChild ? Slot : "button"
        const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
            if (!ripple) return
            const target = e.currentTarget as HTMLElement
            const rect = target.getBoundingClientRect()
            const span = document.createElement("span")
            span.className = "ripple-element"
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            span.style.left = `${x}px`
            span.style.top = `${y}px`
            target.appendChild(span)
            span.addEventListener("animationend", () => {
                span.remove()
            })
        }
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }), ripple && "ripple")}
                ref={ref}
                onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                    const forward = props.onMouseDown as React.MouseEventHandler<HTMLButtonElement> | undefined
                    if (forward) forward(e as unknown as React.MouseEvent<HTMLButtonElement>)
                    handleMouseDown(e)
                }}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
