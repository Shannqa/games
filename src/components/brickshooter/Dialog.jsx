import React, { useEffect, useRef } from "react";
import styles from "../../styles/brickshooter.module.css";

function Dialog({ isOpen, confirm, onConfirm, onCancel, text, input }) {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Enter") {
        onConfirm();
      }
    };

    document.addEventListener("keyDown", handleKeyDown);
    return () => document.removeEventListener("keyDown", handleKeyDown);
  }, [onConfirm, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.modal}`} role="dialog" tabIndex="-1">
      {text}
      {input ? (
        <>
          <input
            type="text"
            placeholder="Anonnymous..."
            onChange={input}
            ref={modalRef}
          />
          <button onClick={onConfirm}>{confirm}</button>
        </>
      ) : (
        <button onClick={onConfirm} ref={modalRef}>
          {confirm}
        </button>
      )}

      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}

export default Dialog;
