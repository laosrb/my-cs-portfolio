import React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-gray-900 transition-all"
        style={{ width: `${value || 0}%` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };

