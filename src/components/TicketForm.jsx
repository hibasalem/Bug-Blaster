import React, { useCallback, useEffect, useState } from "react";
import { priorities, defaultPriority } from "../constants/priorities";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(defaultPriority);

  const clearForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setPriority(defaultPriority);
  }, []);

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket, clearForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticket = {
      id: editingTicket ? editingTicket.id : crypto.randomUUID(),
      createdAt: editingTicket ? editingTicket.createdAt : new Date().toISOString(),
      title,
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticket,
    });
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {priorities.map(({ value, label }) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <button type="submit" className="button">Save
      </button>

      {editingTicket && (
        <button
          type="button"
          className="button"
          onClick={() => dispatch({ type: "CLEAR_EDITING_TICKET" })}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
