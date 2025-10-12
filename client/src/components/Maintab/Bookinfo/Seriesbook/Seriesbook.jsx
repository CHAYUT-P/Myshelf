import React, { useState } from "react";
import "./Seriesbook.css";
import AddBook from "./Addseriesbook/Addseriesbook";

export default function Seriesbook({ book, onChange }) {
  const [seriesBooks, setSeriesBooks] = useState(book.books || []);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBook = (newBook) => {
    const updated = [...seriesBooks, { ...newBook, id: Date.now() }];
    setSeriesBooks(updated);
    onChange((prev) => ({ ...prev, books: updated }));
    setShowAddBookModal(false);
  };

  const handleDeleteBook = (id) => {
    const updated = seriesBooks.filter((b) => b.id !== id);
    setSeriesBooks(updated);
    onChange((prev) => ({ ...prev, books: updated }));
  };

  return (
    <div className="series-main">
      <h2>{book?.seriesName || "Series Book"}</h2>

      <ul className="series-book-list">
        {seriesBooks.map((b) => (
          <li
            key={b.id}
            className="book-item"
            onClick={() => setSelectedBook(b)}
          >
            <div
              className="book-cover"
              style={{
                backgroundColor:
                  b.coverImage || b.localCover ? "transparent" : "#ccc",
                backgroundImage: b.coverImage
                  ? `url(${b.coverImage})`
                  : b.localCover
                  ? `url(${URL.createObjectURL(b.localCover)})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="book-info">
              <p className="book-name">{b.title}</p>
              <p className="book-category">{b.category || "Unknown"}</p>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBook(b.id);
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}

        {/* ✅ Add button now inside UL */}
        <li>
          <button
            className="addbook-button"
            onClick={() => setShowAddBookModal(true)}
          >
            ➕ Add Book
          </button>
        </li>
      </ul>

      {/* Modal for adding new book */}
      <AddBook
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        onAdd={handleAddBook}
      />
    </div>
  );
}