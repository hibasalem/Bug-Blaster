import React from "react";
import TicketItem from "./TicketItem";

export default function TicketList({ tickets, dispatch }) {
  return tickets.length === 0 ? (
    <p className="empty-state">No tickets yet. Create one above.</p>
  ) : (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} dispatch={dispatch} />
      ))}
    </div>
  );
}
