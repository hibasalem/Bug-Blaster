import React from "react";
import SortSelect from "./SortSelect";
import SortToggle from "./SortToggle";

const controlComponents = {
  select: SortSelect,
  toggle: SortToggle,
};

export default function TicketSort({ controls, sort, onChange }) {
  return (
    <div className="ticket-sort">
      {controls.map(({ key, control, label, options }) => {
        const Control = controlComponents[control];
        return (
          <Control
            key={key}
            label={label}
            options={options}
            value={sort[key]}
            onChange={(option) => onChange(key, option)}
          />
        );
      })}
    </div>
  );
}
