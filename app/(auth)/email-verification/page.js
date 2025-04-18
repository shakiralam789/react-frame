"use client";
import React, { useState } from "react";
import AuthLayout from "../partial/AuthLayout";
import AuthCard from "../partial/AuthCard";
import Label from "@/components/form/Label";
import Button from "@/components/form/Button";
import Link from "next/link";
import TextField from "@/components/form/TextField";
import useForm from "@/hook/_customUseForm";
import ErrorMsg from "@/components/ErrorMsg";

const LoginForm = () => {
  const { errors, post, register, handleSubmit } = useForm({
    code: "",
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
        <Label htmlFor="email">Enter Your Email Address</Label>
        <TextField
          {...register("code", {
            required: "Code is required",
            isEmail: "Please enter a valid code",
          })}
          placeholder="Enter verification code"
        />
        <ErrorMsg message={errors?.code?.message} />
      </div>

      <Button type="submit" className="mb-4">
        Verify
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

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Email Verification"
        desc={"We have sent a 6 digit verification code to your email "}
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
