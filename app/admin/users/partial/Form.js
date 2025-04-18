"use client";
import ErrorMsg from "@/components/ErrorMsg";
import Button from "@/components/form/Button";
import Label from "@/components/form/Label";
import TextField from "@/components/form/TextField";
import useForm from "@/hook/_customUseForm";
import React from "react";

export default function Form({ userData = null }) {
  const { register, post, put, errors, handleSubmit } = useForm(userData || {});

  function onSubmit(data) {
    console.log(data);
    if (!userData) {
      console.log("create user");
    } else {
      console.log("update user");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Full name</Label>
          <TextField
            {...register("name", { required: "Name is required" })}
            placeholder={"Enter your name"}
          />
          <ErrorMsg message={errors?.name?.message} />
        </div>
        <div>
          <Label>Email address</Label>
          <TextField
            {...register("email", {
              required: "Email is required",
              isEmail: "Please enter a valid email address",
            })}
            placeholder={"Enter your Email address"}
          />
          <ErrorMsg message={errors?.email?.message} />
        </div>
        <div>
          <Label>Phone number</Label>
          <TextField
            {...register("phone", { required: "Phone number is required" })}
            placeholder={"Enter your Phone number"}
          />
          <ErrorMsg message={errors?.phone?.message} />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mt-4 2xl:mt-6">
          <Button type="reset" variant="danger">Reset</Button>
          <Button type="submit">{userData ? "Update" : "Create"} user</Button>
        </div>
      </div>
    </form>
  );
}
