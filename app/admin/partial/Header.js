
import Link from "next/link";
import Image from "next/image";
import {
  BellIcon,
  EnvelopeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { MenuCom, MenuItemCom } from "@/components/MenuCom";
import { pageTitle } from "@/utilities/titleStore";
import Language from "./language";

const Header = () => {
  return (
    <header className="header-height bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 pl-20 md:pl-8">
      <h1 className="text-gray-text font-medium capitalize">
        {pageTitle}
      </h1>

      <div className="flex items-center space-x-4 2xl:space-x-6">
        <MenuCom
          menuBtnClass="text-gray-500 hover:text-gray-700"
          menuBtn={() => <BellIcon className="size-5 2xl:size-6" />}
        >
          <div>
            <div className="font-16 text-center bg-gray-light p-2 rounded-lg text-gray-text">
              No notification
            </div>
          </div>
        </MenuCom>
        {/* <Language /> */}
        <button className="text-gray-500 hover:text-gray-700">
          <EnvelopeIcon className="size-5 2xl:size-6" />
        </button>

        <MenuCom
          menuBtn={() => (
            <>
              <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
                {/* <Image
                  src="/avatar-placeholder.png"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                /> */}
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </>
          )}
          menuBtnClass="flex items-center space-x-2 cursor-pointer"
        >
          <div className="flex gap-2 border-b pb-1 mb-1 2xl:pb-2 2xl:mb-2">
            <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
              {/* <Image
                src="/avatar-placeholder.png"
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover"
              /> */}
            </div>
            <div>
              <p className="font-semibold font-16">John Doe</p>
              <p className="text-gray-500 font-14">Admin</p>
            </div>
          </div>
          <MenuItemCom href="/login">Logout</MenuItemCom>
        </MenuCom>
      </div>
    </header>
  );
};

export default Header;
