import React, { useCallback, useEffect, useState } from "react";
import { priorities, defaultPriority } from "../constants/priorities";

export default function TicketForm({ dispatch, editingTicket, onClose }) {
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
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div className="form-field">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          placeholder="Short summary of the bug"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea
          value={description}
          className="form-input"
          placeholder="Steps to reproduce, expected vs actual behaviour..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <fieldset className="form-field priority-fieldset">
        <legend className="form-label">Priority</legend>
        <div className="priority-options">
          {priorities.map(({ value, label, className }) => (
            <label
              key={value}
              className={`priority-option ${priority === value ? "selected" : ""}`}
            >
              <input
                type="radio"
                value={value}
                checked={priority === value}
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className={`status-dot ${className}`}></span>
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            clearForm();
            onClose();
          }}
        >
          Cancel
        </button>
        <button type="submit" className="button button-primary">
          Save
        </button>
      </div>
    </form>
  );
}
