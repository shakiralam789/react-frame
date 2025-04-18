"use client";
import { Button } from "@/components/form/Button";
import Filter from "../partial/Filter";
import Page from "../partial/Page";
import UserTableDesign from "./partial/UserTable";
import { useState } from "react";
import UserModal from "./partial/UserModal";
import UsersIcon from "@/components/icons/UsersIcon";


export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Page title={"Users"} Icon={UsersIcon}>
      <div className="box-section">
        <Filter onChange={(e) => console.log(e)}>
          <Button plus={true} onClick={() => setIsOpen(true)}>
            Add new user
          </Button>
          <Button href={"/admin/users/create"} plus={true}>
            Create user
          </Button>
        </Filter>
        <UserTableDesign />
      </div>

      <UserModal title={"Add User"} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Page>
  );
}
