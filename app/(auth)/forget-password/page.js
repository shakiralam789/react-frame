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
  const { errors,post, register, handleSubmit } = useForm({
    email: "",
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
          {...register("email", {
            required: "Email is required",
            isEmail: "Please enter a valid email address"
          })}
          placeholder="Enter your email address"
        />
        <ErrorMsg message={errors?.email?.message} />
      </div>

      <Button type="submit" className="mb-4">
        Reset password
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
      <AuthCard title="Forgotten your Password?" desc={'Enter your valid details to reset your password'}>
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
