import React from "react";

export default function SpinAnim() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex gap-1">
        <span
          className="size-1 2xl:size-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></span>
        <span
          className="size-1 2xl:size-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="size-1 2xl:size-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></span>
      </span>
    </span>
  );
}
