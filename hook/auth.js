"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/store/slices/authSlice";
import useApi from "./useApi";

export default function useAuthFunc() {
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { get, post, processing } = useApi();

  const csrf = get("/sanctum/csrf-cookie");

  useEffect(() => {
    isMounted.current = true;
    async function getUser() {
      await get("/user", {
        onSuccess: (res) => {
          dispatch(setUser(res));
        },
        onError: (err) => {
          console.log(err);
          dispatch(setUser(null));
        },
      });
    }

    getUser();
  }, []);

  const login = async (data, callbackUrl = "/dashboard") => {
    await csrf();
    try {
      const result = await post("/login", data);

      if (result?.error) {
        return { success: false, error: result.error };
      }

      if (result.user?.token) {
        localStorage.setItem("token", result.user.token);
        dispatch(setUser(result.user));
      }

      router.push(callbackUrl);
      return { success: true };
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async (callbackUrl = "/login") => {
    await csrf();
    try {
      localStorage.removeItem("token");
      dispatch(setUser(null));
      await post("/logout");
      router.push(callbackUrl);
      return { success: true };
    } catch (error) {
      const errorMessage = "Logout failed. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  return {
    login,
    logout,
    processing,
    isMounted,
    error,
    setError,
  };
}
