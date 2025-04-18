import cn from "@/utilities/cn";
import React from "react";

export default function Label({ className = "", children, ...props }) {
  return (
    <label className={cn("def-label", className)} {...props}>
      {children}
    </label>
  );
}
