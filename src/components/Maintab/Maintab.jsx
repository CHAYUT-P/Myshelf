import React, { useState, useEffect } from "react";
import "./Maintab.css";
import AddBook from "./Addbook/Addbook";
import BookInfo from "./Bookinfo/Bookinfo";

export default function MainTab({
  activeShelfId,
  shelves,
  onAddBook,
  isOpen,
  onRenameShelf,
}) {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showBookInfo, setShowBookInfo] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [shelfName, setShelfName] = useState("");

  const activeShelf = shelves.find((shelf) => shelf.id === activeShelfId);
  if (!activeShelf) return <p>No shelf selected</p>;

  useEffect(() => {
    if (!isEditingName) setShelfName(activeShelf.name);
  }, [activeShelf.name, isEditingName]);

  const handleSave = () => {
    setIsEditingName(false);
    const trimmedName = shelfName.trim();
    if (trimmedName && trimmedName !== activeShelf.name && onRenameShelf) {
      onRenameShelf(activeShelf.id, trimmedName);
    } else {
      setShelfName(activeShelf.name); // revert if empty
    }
  };

  return (
    <div className={`main-tab ${isOpen ? "open" : ""}`}>
      <div className="top-page">
        <div className="title-container">
          {isEditingName ? (
            <input
              type="text"
              value={shelfName}
              autoFocus
              className="title-input"
              onChange={(e) => setShelfName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setShelfName(activeShelf.name);
                  setIsEditingName(false);
                }
              }}
            />
          ) : (
            <h2 onClick={() => setIsEditingName(true)}>{activeShelf.name}</h2>
          )}
        </div>
      </div>

      <div className="main-page">
        <ul className="book-list">
          {activeShelf.books?.map((book) => (
            <li
              key={book.id}
              className="book-item"
              onDoubleClick={() => setShowBookInfo(true)}
            >
              <div
                className="book-cover"
                style={{
                  backgroundColor: book.coverImage ? "transparent" : "#ccc",
                  backgroundImage: book.coverImage
                    ? `url(${book.coverImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="book-info">
                <p className="book-name">{book.title}</p>
                <p className="book-category">
                  {book.category || "No category"}
                </p>
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

            <BookInfo
              isOpen={showBookInfo}
              onClose={() => setShowBookInfo(false)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
