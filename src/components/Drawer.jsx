import React, { useEffect } from "react";

export default function Drawer({ isOpen, title, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      <aside
        className={`drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        inert={!isOpen}
      >
        <div className="drawer-header">
          <h2>{title}</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </aside>
    </>
  );
}
