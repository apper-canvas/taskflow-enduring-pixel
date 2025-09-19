import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "priority-badge bg-slate-100 text-slate-800",
    high: "priority-badge priority-high",
    medium: "priority-badge priority-medium", 
    low: "priority-badge priority-low",
    category: "category-chip"
  }

  return (
    <span
      className={cn(
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge