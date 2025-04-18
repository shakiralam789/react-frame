import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { MenuCom, MenuItemCom } from "../MenuCom";
import cn from "@/utilities/cn";

export default function TableDropdown({ className = "", children }) {
  return (
    <MenuCom
      menuBtnClass={cn(
        "data-[open]:!bg-gray-200 data-[open]:!text-gray-500 mx-auto size-5 2xl:size-6 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-500",
        className
      )}
      menuBtn={() => <EllipsisVerticalIcon className="h-full" />}
    >
      {children}
    </MenuCom>
  );
}

export function TableDropdownItem({ children, className = "", ...props }) {
  return (
    <MenuItemCom className={cn("", className)} {...props}>
      {children}
    </MenuItemCom>
  );
}
