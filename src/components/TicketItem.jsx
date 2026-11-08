import React from "react";
import { priorities } from "../constants/priorities";

export default function TicketItem({ ticket, dispatch }) {
  const { title, description, priority } = ticket;

  return (
    <div className="ticket-item">
      <div
        className={`priority-dot ${
          priorities.find((p) => p.value === priority)?.className
        }`}
      ></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="ticket-date">
        Created: {new Date(ticket.createdAt).toLocaleString()}
      </p>
      <button
        className="button"
        onClick={() => dispatch({ type: "SET_EDITING_TICKET", payload: ticket })}
      >
        Edit
      </button>
      <button
        className="button"
        onClick={() => dispatch({ type: "DELETE_TICKET", payload: { id: ticket.id } })}
      >
        Delete
      </button>
    </div>
  );
}
