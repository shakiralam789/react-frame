import cn from "@/utilities/cn";

export default function Switch({ className = "", ...props }) {
  return (
    <label
      className={cn(
        "group has-[input:checked]:bg-primary-purple cursor-pointer duration-300 w-12 h-5 rounded-full bg-gray-300 flex items-center p-1",
        className
      )}
    >
      <input type="checkbox" className="sr-only peer" {...props} />
      <div
        className={cn(
          "duration-300 group-has-[input:checked]:bg-white group-has-[input:checked]:ml-7 bg-gray-400 h-full aspect-square rounded-full"
        )}
      ></div>
    </label>
  );
}
