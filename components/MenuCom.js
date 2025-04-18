import cn from "@/utilities/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

function MenuCom({
  menuBtnClass = "",
  MenuItemsClass = "",
  menuBtn = () => {},
  children,
}) {
  return (
    <Menu>
      <MenuButton className={menuBtnClass}>{menuBtn()}</MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className={cn(
          "z-[99] dropdown-shadow font-16 min-w-[154px] origin-top-right rounded-xl bg-white p-1 2xl:p-2 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0",
          MenuItemsClass
        )}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

function MenuItemCom({
  children,
  className = "",
  icon = false,
  as = "div",
  href = "",
  ...props
}) {
  return (
    <MenuItem as={as}>
      {href ? (
        <Link
          href={href}
          className={cn(`${icon ? "list-with-icon" : "list"}`, className)}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <div
          className={cn(`${icon ? "list-with-icon" : "list"}`, className)}
          {...props}
        >
          {children}
        </div>
      )}
    </MenuItem>
  );
}

export { MenuItemCom, MenuCom };
