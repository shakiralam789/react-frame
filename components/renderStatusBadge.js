import React from "react";

export default function RenderStatusBadge({ status }) {
  if (status === "active") {
    return (
      <div className="w-fit text-green-500 bg-green-light px-2 py-0.5 rounded-full">
        Active
      </div>
    );
  }
  return (
    <div className="w-fit text-gray-gray-400 bg-gray-light px-2 py-0.5 rounded-full">
      Inactive
    </div>
  );
}
