import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = React.forwardRef(({ 
  className,
  checked,
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked 
            ? "bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 checkbox-animation" 
            : "border-slate-300 hover:border-primary-400 bg-white",
          className
        )}
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            className="w-3 h-3 text-white font-bold animate-scale-in" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox