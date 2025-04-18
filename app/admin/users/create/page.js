"use client";
import React from "react";
import Page from "../../partial/Page";
import SectionTitle from "../../partial/SectionTitle";
import Form from "../partial/Form";
import UsersIcon from "@/components/icons/UsersIcon";

export default function CreateUser() {
  return (
    <Page title={"Create User"} Icon={UsersIcon}>
      <div className="box-section">
        <SectionTitle>Add users</SectionTitle>
        <Form />
      </div>
    </Page>
  );
}
