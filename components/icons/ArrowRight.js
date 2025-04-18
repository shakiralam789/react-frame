import cn from "@/utilities/cn";

export default function ArrowRight({ className = "" }) {
  return (
    <svg
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-3.5 2xl:4',className)}
    >
      <path
        d="M10.8868 3L8 0.113249L5.11325 3L8 5.88675L10.8868 3ZM0 3.5H8V2.5H0V3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
