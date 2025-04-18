"use client";
import { useEffect } from "react";
import { setPageTitle } from "@/utilities/titleStore";
import Breadcrumb from "./Breadcrumb";

function Page({ title, children, Icon, backBtn = true, additional=null }) {
  useEffect(() => {
    setPageTitle(title);
    return () => setPageTitle("");
  }, [title]);

  return (
    <>
      <Breadcrumb Icon={Icon} backBtn={backBtn}>
        {additional ? additional() : null}
      </Breadcrumb>
      {children}
    </>
  );
}

export default Page;
