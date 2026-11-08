import React from "react";
import { priorities } from "../constants/priorities";

export default function TicketItem({ ticket, dispatch }) {
  const { title, description, priority, createdAt } = ticket;
  const priorityInfo = priorities.find((p) => p.value === priority);

  return (
    <article className="ticket-item">
      <div className="ticket-header">
        <h3 className="ticket-title">{title}</h3>
        <span className={`priority-badge ${priorityInfo?.className}`}>
          {priorityInfo?.label}
        </span>
      </div>

      <p className="ticket-description">{description}</p>

      <div className="ticket-footer">
        <span className="ticket-date">
          {new Date(createdAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
        <div className="ticket-actions">
          <button
            className="button button-ghost button-sm"
            onClick={() => dispatch({ type: "SET_EDITING_TICKET", payload: ticket })}
          >
            Edit
          </button>
          <button
            className="button button-danger-ghost button-sm"
            onClick={() => dispatch({ type: "DELETE_TICKET", payload: { id: ticket.id } })}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
