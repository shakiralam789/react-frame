import cn from "@/utilities/cn";
import React from "react";

export function Table({ children, className = "", tableClassName = "" }) {
  return (
    <div
      className={cn(
        "w-full bg-white overflow-x-auto rounded-lg border border-gray-200",
        className
      )}
    >
      <table
        className={cn(
          "min-w-full divide-y divide-gray-200 font-14",
          tableClassName
        )}
      >
        {children}
      </table>
    </div>
  );
}

export function Thead({ children, className = "" }) {
  return (
    <thead className={cn("bg-gray-50", className)}>
      <Trow role="header">{children}</Trow>
    </thead>
  );
}

export function Tbody({ children, className = "" }) {
  return (
    <tbody className={cn("bg-white divide-y divide-gray-200", className)}>
      {children}
    </tbody>
  );
}

export function Trow({ children, className = "", role = "row", ...props }) {
  return (
    <tr
      className={cn("divide-x divide-gray-200", className, {
        "hover:bg-gray-50": role === "row",
      })}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TCell({ children, className = "", role = "cell", ...props }) {
  const baseClass = "px-4 2xl:px-6 h-8 2xl:h-10 py-1";
  if (role === "header") {
    return (
      <th
        scope="col"
        className={cn(
          `${baseClass} text-left font-medium text-gray-700 capitalize tracking-wider whitespace-nowrap`,
          className
        )}
        {...props}
      >
        {children}
      </th>
    );
  }

  return (
    <td className={cn(`${baseClass} text-gray-500`, className)} {...props}>{children}</td>
  );
}

export function Nodata() {
  return (
    <Trow>
      <TCell  colSpan={100} className="text-center">
        No data found
      </TCell>
    </Trow>
  );
}
