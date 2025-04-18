"use client";

import { useState, forwardRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import cn from "@/utilities/cn";
import TextField from "./TextField";

const PasswordField = forwardRef(({ className = '', ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={cn("relative", className)}>
      <TextField
        ref={ref}
        placeholder={rest.placeholder ? rest.placeholder : "Password"}
        className={"pr-10"}
        type={showPassword ? "text" : "password"}
        {...rest}
      />
      <button
        onClick={handleShowPassword}
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <EyeSlashIcon className="w-4 2xl:w-5"/> : <EyeIcon className="w-4 2xl:w-5"/>}
      </button>
    </div>
  );
});

// Assign a display name for debugging
PasswordField.displayName = "PasswordField";

export default PasswordField;
