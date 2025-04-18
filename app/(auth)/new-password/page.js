"use client";
import React, { useState } from "react";
import AuthLayout from "../partial/AuthLayout";
import AuthCard from "../partial/AuthCard";
import Label from "@/components/form/Label";
import Button from "@/components/form/Button";
import Link from "next/link";
import useForm from "@/hook/_customUseForm";
import ErrorMsg from "@/components/ErrorMsg";
import PasswordField from "@/components/form/PasswordField";
import {
  combineRules,
  minLengthRule,
  requiredRule,
} from "@/utilities/validationUtils";

const Form = () => {
  const { errors, post, register, handleSubmit } = useForm({
    password: "",
    confirmPassword: "",
  });

  const submitForm = (data) => {
    post("/api/auth/login", {
      body: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-4 2xl:space-y-6"
    >
      <div>
        <Label htmlFor="password">New Password</Label>
        <PasswordField
          {...register(
            "password",
            combineRules(
              requiredRule("Password is required"),
              minLengthRule(8, "Password must be at least 8 characters")
            )
          )}
          placeholder="Enter your password"
        />
        <ErrorMsg message={errors?.password?.message} />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordField
          {...register(
            "confirmPassword",
            combineRules(
              requiredRule("Confirm password is required"),
              minLengthRule(8, "Password must be at least 8 characters"),
              {
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              }
            )
          )}
          placeholder="Confirm your password"
        />
        <ErrorMsg message={errors?.confirmPassword?.message} />
      </div>

      <Button type="submit" className="mb-4">
        Save password
      </Button>

      <Link
        type="button"
        className="inline-block text-gray-text font-14 hover:underline"
        href="/login"
      >
        Back to login page?
      </Link>
    </form>
  );
};

const NewPassword = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="New Password"
        desc={"Enter your new password to continue"}
      >
        <Form />
      </AuthCard>
    </AuthLayout>
  );
};

export default NewPassword;
