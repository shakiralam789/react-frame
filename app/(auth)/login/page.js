"use client";
import React from "react";
import AuthLayout from "../partial/AuthLayout";
import AuthCard from "../partial/AuthCard";
import Label from "@/components/form/Label";
import Button from "@/components/form/Button";
import Link from "next/link";
import PasswordField from "@/components/form/PasswordField";
import TextField from "@/components/form/TextField";
import ErrorMsg from "@/components/ErrorMsg";
import {
  combineRules,
  emailRule,
  minLengthRule,
  requiredRule,
} from "@/utilities/validationUtils";
import useForm from "@/hook/_customUseForm";
import { useSearchParams } from "next/navigation";
import useAuthFunc from "@/hook/auth";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  // const { login, error: loginError } = useAuthFunc();
  const { errors, register, handleSubmit } = useForm({
    email: "",
    password: "",
  });
  const submitForm = async (data) => {
    // await login(data, callbackUrl);
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
            isEmail: "Please enter a valid email address",
          })}
          placeholder="Enter your email address"
        />
        <ErrorMsg message={errors?.email?.message} />
      </div>

      <div>
        <Label htmlFor="password">Enter Your Password</Label>
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

      <Button href={"/dashboard"} className="mb-4">
        Login
      </Button>

      <Link
        type="button"
        className="inline-block text-gray-text font-14 hover:underline"
        href="/forget-password"
      >
        Forgot Password?
      </Link>
    </form>
  );
};

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Login"
        // logo="/images/auth-logo.png"
        desc={"Enter login details to continue"}
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
