import React, { useState, useEffect } from "react";
import "./Bookinfo.css";
import SingleBook from "./Singlebook/Singlebook";
import Seriesbook from "./Seriesbook/Seriesbook";

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
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-info-body">
          {book?.bookType === "single" && (
            <SingleBook
              book={book}
              shelfId={activeShelfId}
              onChange={setEditedBook}
            />
          )}
          {book?.bookType === "series" && (
            <Seriesbook book={book} onChange={setEditedBook} />
          )}
        </div>

        <div className="modal-btn">
          <button>Remove</button>
          <button
            onClick={() => {
              onEditBook(activeShelfId, editedBook);
              onClose();
              fetch(`http://localhost:4000/shelves/${activeShelfId}/books/${editedBook.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedBook),
              });
            }}
          >
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}