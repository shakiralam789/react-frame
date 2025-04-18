import cn from "@/utilities/cn";

export default function TextField({
  className = "",
  fieldType = "",
  onKeyPress = () => {},
  ...props
}) {

  return (
    <input
      type="text"
      className={cn("field-base", className)}
      {...props}
    />
  );
}