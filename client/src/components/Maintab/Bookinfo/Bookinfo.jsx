import React from "react";
import "./Bookinfo.css";
import SingleBook from "./Singlebook/Singlebook";

export default function BookInfo({
  isOpen,
  onClose,
  selectedBookId,
  shelves,
  activeShelfId,
}) {
  if (!isOpen) return null;

  const shelf = shelves.find((s) => s.id === activeShelfId);
  const book = shelf?.books.find((b) => b.id === selectedBookId);

  return (
    <div className="modal-backdrop">
      <div className="modal-content-bookdetail">
        <div className="modal-title-bar">
          <span></span>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        {book?.bookType === "single" && (
          <SingleBook  book={book} />
        )}
        <div className="modal-btn">
          <button>Remove</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}