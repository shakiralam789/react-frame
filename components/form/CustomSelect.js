"use client";

import cn from "@/utilities/cn";
import { useEffect, useState, useMemo } from "react";
import Select, { components } from "react-select";
import ChevronDown from "../icons/ChevronDown";

// Custom Control component
const CustomControl = ({ children, ...props }) => {
  const { selectProps } = props;
  return (
    <components.Control
      {...props}
      className={`${selectProps.menuIsOpen ? "open" : ""} react-select-container !cursor-pointer field-base !rounded-lg !border-gray-200`}
    >
      {children}
    </components.Control>
  );
};

// Custom Menu component
const CustomMenu = (props) => (
  <components.Menu className="!px-1 2xl:!px-2 !py-0 2xl:!py-1 !rounded-xl" {...props}>
    {props.children}
  </components.Menu>
);

// Custom Option component
const CustomOption = (props) => (
  <components.Option {...props} className={`list ${props.isSelected ? "active" : ""}`}>
    {props.children}
  </components.Option>
);

// Custom Dropdown Indicator with rotation
const DropdownIndicator = (props) => {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator
      className={`${selectProps.menuIsOpen ? "open" : ""} dropdown-icon-container`}
      {...props}
    >
      <span
        style={{
          color: "gray",
          display: "inline-flex",
          transform: selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          transformOrigin: "center",
        }}
      >
        <ChevronDown className="dropdown-icon" />
      </span>
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = () => null;

// Custom Select component
export default function CustomSelect({
  value,
  options = [],
  placeholder = "Select",
  onChange,
  search = false,
  byLabel = false,
  border = true,
  className = "",
  ...rest
}) {
  const [isClient, setIsClient] = useState(false);

  // Find the correct selected option from options list
  const defaultOption = useMemo(
    () => options.find((option) => option.value === value) || null,
    [value, options]
  );
  
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  // Handle selection change
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange?.(byLabel ? selectedOption : selectedOption?.value ?? null);
  };

  if (!isClient) return null;

  return (
    <Select
      className={cn("w-full", className)}
      value={selectedOption || null}
      options={options}
      placeholder={placeholder}
      menuPlacement="auto"
      onChange={handleChange}
      isSearchable={search}
      border={border}
      components={{
        Control: CustomControl,
        Option: CustomOption,
        Menu: CustomMenu,
        DropdownIndicator: DropdownIndicator,
        IndicatorSeparator,
      }}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      {...rest}
    />
  );
}
