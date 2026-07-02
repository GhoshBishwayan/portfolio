"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLElement, HTMLMotionProps<"article">>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.article
        ref={ref}
        className={cn(
          "group rounded-xl border border-border/10 bg-zinc-900/40 p-6 shadow-sm transition-all hover:border-border/30 hover:bg-zinc-800/40 dark:border-white/10 dark:bg-[#101116] dark:hover:bg-[#14161d]",
          className
        )}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 },
          },
        }}
        whileHover={{ scale: 1.015, y: -4 }}
        {...props}
      >
        {children}
      </motion.article>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({
  className,
  eyebrow,
  title,
}: {
  className?: string;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      {eyebrow && (
        <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      )}
    </div>
  );
}
