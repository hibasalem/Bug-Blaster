import React from "react";

export default function SortToggle({ options, value, onChange }) {
  return (
    <button
      className="button button-secondary"
      onClick={() =>
        onChange(options[(options.indexOf(value) + 1) % options.length])
      }
    >
      {value.label}
    </button>
  );
}
