"use client";
import { useEffect, useState } from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute w-20 h-20 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Middle Ring */}
        <div className="absolute w-14 h-14 border-4 border-gray-500 border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        {/* Inner Ring */}
        <div className="absolute w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Glow Effect */}
        {/* <div className="absolute w-10 h-10 bg-blue-500 rounded-full animate-ping"></div> */}
      </div>
    </div>
  );
};

export default function PreloaderLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </>
  );
}
