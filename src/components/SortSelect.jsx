import React from "react";

export default function SortSelect({ label, options, value, onChange }) {
  return (
    <label className="sort-select">
      {label}
      <select
        value={value.value}
        onChange={(e) =>
          onChange(options.find((option) => option.value === e.target.value))
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
