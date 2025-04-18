"use client";
import { MenuCom, MenuItemCom } from "@/components/MenuCom";
import getCookie from "@/utilities/helper";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const langName = {
  en: "en",
  bn: "বাং",
};

export default function Language() {
  const [lang, setLang] = useState("en");

  function handleLangSwitch(lang) {
    document.cookie = `language=${lang}; path=/; max-age=31536000`;
    window.location.reload();
  }

  useEffect(() => {
    const lang = getCookie("language");
    if (lang) {
      setLang(lang);
    }
  }, []);
  return (
    <MenuCom
      menuBtnClass="data-[open]:bg-gray-100 font-16 hover:bg-gray-100 px-2 py-0.5 rounded-md flex items-center space-x-2 text-gray-500 hover:text-gray-700"
      menuBtn={() => (
        <>
          <span className="uppercase">{langName[lang]}</span>
          <ChevronDownIcon className="size-4" />
        </>
      )}
    >
      <MenuItemCom onClick={() => handleLangSwitch("en")}>English</MenuItemCom>
      <MenuItemCom onClick={() => handleLangSwitch("bn")}>বাংলা</MenuItemCom>
    </MenuCom>
  );
}
