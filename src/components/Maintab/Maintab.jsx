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
        <div className="top-page">
            <h2>{activeShelf.name}</h2>
        </div>
        <div className="main-page">
            <ul className="book-list">
                {activeShelf.books?.map(book => (
                    <li key={book.id} className="book-item">
                        <div className="book-cover" style={{
                            backgroundColor: book.coverImage ? 'transparent' : '#ccc',
                            backgroundImage: book.coverImage ? `url(${book.coverImage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                        <div className="book-info">
                            <p className="book-name">{book.title}</p>
                            <p className="book-category">{book.category || 'No category'}</p>
                        </div>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => setShowAddBookModal(true)}
                        className="addbook-button"
                        >
                        Add Book
                    </button>

                    <AddBook
                        isOpen={showAddBookModal}
                        onClose={() => setShowAddBookModal(false)}
                        onAdd={(book) => onAddBook(activeShelf.id, book)}
                    />
                </li>
            </ul>

        </div>
       
    </div>
  );
}
