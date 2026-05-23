import React from "react";

export interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Skeleton({ 
  className = "", 
  variant = "rect", 
  style,
  ...props 
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  const variantClass = variant === "circle" ? "rounded-full" : "rounded";
  return (
    <div
      className={`animate-pulse bg-slate-200 ${variantClass} ${className}`}
      style={style}
      {...props}
    />
  );
}
