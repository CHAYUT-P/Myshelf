import React, { useState } from "react";
import "./AddBook.css";

export default function AddBook({ isOpen, onClose, onAdd }) {
  const [bookName, setBookName] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!bookName.trim()) return;
    onAdd(bookName);
    setBookName("");
    onClose();
  };

  return (
    <div className="modal-content">
      <div className="modal-title-bar">
        <span>Add Book</span>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="modal-body">
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Book name"
          autoFocus
        />
        <div className="modal-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
