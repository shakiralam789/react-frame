import cn from "@/utilities/cn";

export default function LocationField({ className = "", ...props }) {
  return (
    <div className={cn("relative w-full", className)}>
      <input type="text" className="field-base" {...props} />
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
        <svg
          className="size- 2xl:size-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>
  );
}
