"use client";

import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

const Progress = React.forwardRef(
  ({ className, value, variant = "primary", ...props }, ref) => {
    // Define color variants for the progress bar
    const colorVariants = {
      primary: "bg-primary",
      secondary: "bg-[#FE9A01]",
      warning: "bg-[#FECE00]",
      success: "bg-[#00C145]",
      danger: "bg-[#FF3201]",
    };

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full transition-all",
            colorVariants[variant] || colorVariants.primary // Fallback to primary color
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };


 

// const CircularProgress = React.forwardRef(
//   (
//     {
//       className,
//       value,
//       color,
//       size,
//       showValue,
//       loading,
//       customContent,

//       ...props
//     },
//     ref
//   ) => {
//     const radius = 40;
//     const circumference = 2 * Math.PI * radius;
//     const progress = circumference - (circumference * value) / 100;

//     return (
//       <div className="relative">
//         <svg
//           ref={ref}
//           className={cn(
//             circleVariants({ color, size }),

//             className,
//             {
//               "animate-spin": loading,
//             }
//           )}
//           {...props}
//           viewBox="0 0 100 100"
//         >
//           <circle
//             className="stroke-current"
//             strokeWidth=""
//             cx="50"
//             cy="50"
//             r={radius}
//             fill="transparent"
//           ></circle>

//           <circle
//             className=" stroke-current"
//             strokeWidth="8"
//             strokeLinecap="round"
//             cx="50"
//             cy="50"
//             r={radius}
//             fill="transparent"
//             strokeDasharray={`${circumference}, ${circumference}`}
//             strokeDashoffset={progress}
//             style={{
//               transition: "stroke-dashoffset 0.35s",
//               transform: "rotate(-90deg)",
//               transformOrigin: "50% 50%",
//             }}
//           ></circle>
//           {showValue && !loading && (
//             <text
//               x="50"
//               y="50"
//               fontSize="16"
//               textAnchor="middle"
//               alignmentBaseline="middle"
//             >
//               {customContent ? customContent : value + `%`}
//             </text>
//           )}
//         </svg>
//       </div>
//     );
//   }
// );
// CircularProgress.displayName = ProgressPrimitive.Root.displayName;
// export { CircularProgress, Progress };

