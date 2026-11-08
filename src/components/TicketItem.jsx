import React from "react";

const priorityClasses = {
  1: "priority-low",
  2: "priority-medium",
  3: "priority-high",
};

export default function TicketItem({ ticket, dispatch }) {
  const { title, description, priority } = ticket;

  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityClasses[priority]}`}></div>
      <h3>{title}</h3>
      <p>{description}</p>
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
