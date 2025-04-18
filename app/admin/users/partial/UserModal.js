import Button from "@/components/form/Button";
import CustomSelect from "@/components/form/CustomSelect";
import Label from "@/components/form/Label";
import TextField from "@/components/form/TextField";
import Modal from "@/components/Modal";
import React from "react";

export default function UserModal({ title, isOpen, setIsOpen }) {
  return (
    <Modal title={title} show={isOpen} onClose={() => setIsOpen(false)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Full name</Label>
          <TextField placeholder={"Enter your name"} />
        </div>
        <div>
          <Label>Email address</Label>
          <TextField placeholder={"Enter your Email address"} />
        </div>
        <div>
          <Label>phone number</Label>
          <TextField placeholder={"Enter your phone number"} />
        </div>
        <div>
          <Label>Role</Label>
          <CustomSelect
            options={[
              { label: "user", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 2xl:mt-6">
            <Button variant="danger">Reset</Button>
            <Button>Save</Button>
      </div>
    </Modal>
  );
}
