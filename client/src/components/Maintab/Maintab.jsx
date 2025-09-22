import React, { useState, useEffect } from "react";
import "./Maintab.css";
import AddBook from "./Addbook/Addbook";
import BookInfo from "./Bookinfo/Bookinfo";
import BookAddIcon from "../../assets/icons/4243328_ux_book_app_basic_icon.svg?react";
import RemoveBookIcon from "../../assets/icons/4243329_ux_book_app_basic_icon.svg?react";
import BookStatusDropdown from "../../components/Bookstatusdropdown/BookStatusDropdown";

export default function MainTab({
  activeShelfId,
  shelves,
  onAddBook,
  isOpen,
  onRenameShelf,
  handleUpdateBook,
}) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showBookInfo, setShowBookInfo] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [shelfName, setShelfName] = useState("");

  const activeShelf = shelves.find((shelf) => shelf.id === activeShelfId);

  useEffect(() => {
    if (activeShelf && !isEditingName) {
      setShelfName(activeShelf.name);
    }
  }, [activeShelf?.name, isEditingName]);

  const handleSave = () => {
    setIsEditingName(false);
    const trimmedName = shelfName.trim();
    if (
      activeShelf &&
      trimmedName &&
      trimmedName !== activeShelf.name &&
      onRenameShelf
    ) {
      onRenameShelf(activeShelf.id, trimmedName);
    } else if (activeShelf) {
      setShelfName(activeShelf.name);
    }
  };

  if (!activeShelf) {
    return <p>No shelf selected</p>;
  }

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
              onClick={() => {
                setSelectedBookId(book.id);
                setShowBookInfo(true);
              }}
            >
              <div
                className="book-cover"
                style={{
                  backgroundColor:
                    book.localCover || book.coverImage ? "transparent" : "#ccc",
                  backgroundImage: book.localCover
                    ? `url(${URL.createObjectURL(book.localCover)})`
                    : book.coverImage
                    ? `url(${book.coverImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="book-info">
                {book.bookType === "single" ? (
                  <>
                    <p className="book-name">{book.title}</p>
                    <p className="book-category">
                      {book.category || "No category"}
                    </p>
                    <BookStatusDropdown
                      value={book.status || "not-started"}
                      onChange={async (newStatus) => {
                        try {
                          const res = await fetch(
                            `http://localhost:4000/shelves/${activeShelf.id}/books/${book.id}`,
                            {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ status: newStatus }),
                            }
                          );

                          const data = await res.json();
                          handleUpdateBook(activeShelf.id, data.book);
                        } catch (err) {
                          console.error("❌ Failed to update book:", err);
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p className="book-name">{book.seriesName}</p>
                    <p className="book-category">Series</p>
                  </>
                )}
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
              selectedBookId={selectedBookId}
              shelves={shelves}
              activeShelfId={activeShelf.id}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
