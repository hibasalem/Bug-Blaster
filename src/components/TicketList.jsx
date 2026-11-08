import React from "react";
import TicketItem from "./TicketItem";
import sortTickets from "../utils/sortTickets";

export default function TicketList({ tickets, dispatch, sort }) {
  return tickets.length === 0 ? (
    <div className="empty-state">
      <h3>No tickets yet</h3>
      <p>Click "New ticket" to report your first bug.</p>
    </div>
  ) : (
    <div className="ticket-list">
      {sortTickets(tickets, sort).map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} dispatch={dispatch} />
      ))}
    </div>
  );
}
