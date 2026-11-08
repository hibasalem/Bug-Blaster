import React, { useCallback, useEffect, useId, useState } from "react";
import { priorities, defaultPriority } from "../constants/priorities";

export default function TicketForm({ dispatch, editingTicket, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(defaultPriority);
  const titleId = useId();
  const descriptionId = useId();

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
  }, [editingTicket, isOpen, clearForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticket = {
      id: editingTicket ? editingTicket.id : crypto.randomUUID(),
      createdAt: editingTicket ? editingTicket.createdAt : new Date().toISOString(),
      title: title.trim(),
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticket,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div className="form-field">
        <label htmlFor={titleId} className="form-label">Title</label>
        <input
          id={titleId}
          type="text"
          value={title}
          className="form-input"
          placeholder="Short summary of the bug"
          required
          pattern=".*\S.*"
          title="Title can't be empty"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor={descriptionId} className="form-label">Description</label>
        <textarea
          id={descriptionId}
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
                name="priority"
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
        <button type="button" className="button button-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="button button-primary">
          Save
        </button>
      </div>
    </form>
  );
}
