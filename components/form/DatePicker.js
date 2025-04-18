"use client";
import cn from "@/utilities/cn";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { formatDateToYYYYMMDD } from "@/utilities/helper";

export default function ModDataPicker({ className = "", value, ...props }) {
  return (
    <div className={cn("relative w-full", className)}>
      <DatePicker
        className="field-base w-full"
        placeholderText="Select date"
        dateFormat="MMMM d, yyyy"
        value={value ? formatDateToYYYYMMDD(value) : ""}
        isClearable={true}
        {...props}
      />
      <CalendarDateRangeIcon className="size-5 text-gray-400 pointer-events-none absolute top-1/2 -translate-y-1/2 right-3" />
    </div>
  );
}
