import React from "react";
import { priorities } from "../constants/priorities";

export default function StatusBar({ tickets, children }) {
  return (
    <div className="status-bar">
      <div className="status-counts">
        <span className="status-count">
          Total <strong>{tickets.length}</strong>
        </span>
        {priorities.map(({ value, label, className }) => (
          <span key={value} className="status-count">
            <span className={`status-dot ${className}`}></span>
            {label}{" "}
            <strong>
              {tickets.filter((ticket) => ticket.priority === value).length}
            </strong>
          </span>
        ))}
      </div>

      {children}
    </div>
  );
}
