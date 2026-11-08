import React from "react";
import TicketItem from "./TicketItem";
import sortTickets from "../utils/sortTickets";

export default function TicketList({ tickets, dispatch, sort }) {
  return tickets.length === 0 ? (
    <p className="empty-state">No tickets yet. Create one above.</p>
  ) : (
    <div className="ticket-list">
      {sortTickets(tickets, sort).map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} dispatch={dispatch} />
      ))}
    </div>
  );
}
