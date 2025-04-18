"use client";
import SearchInput from "@/components/form/SearchInput";
import React from "react";

export default function Filter({ children, ...props }) {
  return (
    <div className="mb-4 2xl:mb-6 gap-2 flex justify-between flex-wrap">
      <SearchInput {...props} className="flex-1 max-w-[250px]"/>
      <div className="*:flex-1 btn-group flex items-center flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}
