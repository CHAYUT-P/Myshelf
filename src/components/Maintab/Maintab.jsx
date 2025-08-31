import React, { useState } from "react";
import "./Maintab.css";
import AddBook from "./Addbook/Addbook";

export default function MainTab({ activeShelfId, shelves, onAddBook, isOpen }) {
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  // Find the currently active shelf
  const activeShelf = shelves.find(shelf => shelf.id === activeShelfId);

  if (!activeShelf) return <p>No shelf selected</p>;

  return (
    <div className={`main-tab ${isOpen ? "open" : ""}`}>
      <h2>{activeShelf.name}</h2>

      <ul>
        {activeShelf.books?.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>

      <button
        onClick={() => setShowAddBookModal(true)}
        className="addbook-button"
      >
        Add Book
      </button>

      <AddBook
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        onAdd={(bookName) => onAddBook(activeShelf.id, bookName)}
      />
    </div>
  );
}
