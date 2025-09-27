import React, { useState, useEffect } from "react";
import "./Bookinfo.css";
import SingleBook from "./Singlebook/Singlebook";

export default function BookInfo({
  isOpen,
  onClose,
  selectedBookId,
  shelves,
  activeShelfId,
  onEditBook,
}) {
  if (!isOpen) return null;

  const shelf = shelves.find((s) => s.id === activeShelfId);
  const book = shelf?.books.find((b) => b.id === selectedBookId);

  const [editedBook, setEditedBook] = useState(book || {});

  useEffect(() => {
    setEditedBook(book || {});
  }, [book]);



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
          <SingleBook  
            book={book}
            shelfId={activeShelfId}
            onChange={setEditedBook}
          />

        )}
        <div className="modal-btn">
          <button>Remove</button>
          <button onClick={() => {
            onEditBook(activeShelfId, editedBook);
            onClose();}}>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}