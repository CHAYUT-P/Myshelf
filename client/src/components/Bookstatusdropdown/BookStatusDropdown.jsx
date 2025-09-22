import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import CircleIcon from "../../assets/icons/circle-svgrepo-com.svg?react";
import "./BookStatusDropdown.css";

export default function BookStatusDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: "not-started", label: "Not Started", className: "status-not-started" },
    { value: "reading", label: "Reading", className: "status-reading" },
    { value: "completed", label: "Completed", className: "status-completed" },
  ];

  const selectedOption =
    statusOptions.find((opt) => opt.value === value) || statusOptions[0];

  const handleSelect = (val, e) => {
    e.stopPropagation(); //
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="status-dropdown" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={`status-dropdown-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="status-selected">
          <span className={`status-label ${selectedOption.className}`}>
            <CircleIcon className={`circle-icon ${selectedOption.className}`} />
            {selectedOption.label}
          </span>
        </div>
        <ChevronDown className={`chevron ${isOpen ? "rotate" : ""}`} />
      </button>

      {isOpen && (
        <div className="status-dropdown-menu">
          {statusOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`status-option ${option.className} ${
                option.value === value ? "selected" : ""
              }`}
              onClick={(e) => handleSelect(option.value, e)}
            >
              <span className="status-label">
                <CircleIcon className={`circle-icon ${option.className}`} />
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}