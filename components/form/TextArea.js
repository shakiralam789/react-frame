import cn from "@/utilities/cn";

export default function TextArea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn("field-base", className)}
      {...props}
    />
  );
}
