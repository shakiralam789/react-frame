import cn from "@/utilities/cn";
import React from "react";

export default function HomeIcon({ className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <g clipPath="url(#clip0_233_3752)">
        <path
          d="M1 10.1835C1 8.12393 1 7.09414 1.46728 6.24045C1.93456 5.38677 2.78825 4.85694 4.49563 3.7973L6.29563 2.68017C8.10045 1.56005 9.00289 0.999985 10 0.999985C10.9971 0.999985 11.8995 1.56005 13.7044 2.68017L15.5044 3.79729C17.2118 4.85694 18.0654 5.38677 18.5327 6.24045C19 7.09414 19 8.12393 19 10.1835V11.5525C19 15.0632 19 16.8187 17.9456 17.9093C16.8912 19 15.1941 19 11.8 19H8.2C4.80588 19 3.10883 19 2.05441 17.9093C1 16.8187 1 15.0632 1 11.5525V10.1835Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12.5 15H7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_233_3752">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
