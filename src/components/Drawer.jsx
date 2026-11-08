import React, { useEffect, useRef } from "react";

export default function Drawer({ isOpen, title, onClose, children }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    const firstField = drawerRef.current.querySelector(
      ".drawer-body input, .drawer-body textarea, .drawer-body select"
    );
    (firstField ?? drawerRef.current).focus({ preventScroll: true });

    const handleKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      <aside
        ref={drawerRef}
        className={`drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
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
