import cn from "@/utilities/cn";
import React from "react";

export default function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={cn(
        "capitalize font-medium font-24 text-gray-text mb-4 2xl:mb-6",
        className
      )}
    >
      {children}
    </h2>
  );
}
