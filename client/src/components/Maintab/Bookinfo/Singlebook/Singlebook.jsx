import React from "react";
import "./Singlebook.css";

export default function SingleBook({ book }) {
  if (!book) return <p>No book selected</p>;

  return (
    <div className="main">
      <div className="modal-body">
        <div className="book-header">
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className="book-cover"
            />
          )}
          <h2>{book.title}</h2>
          {book.seriesName && <h3>Series: {book.seriesName}</h3>}
        </div>

        <div className="book-details">
          <p><strong>Author:</strong> {book.author || "Unknown"}</p>
          <p><strong>Pages:</strong> {book.pages || "-"}</p>
          <p><strong>Current Page:</strong> {book.currentPage || 0}</p>
          <p><strong>Progress:</strong> {book.progress || 0}%</p>
          <p><strong>Status:</strong> {book.status || "Not started"}</p>
          <p><strong>Rating:</strong> {book.rating || "-"} / 10</p>
          <p><strong>Start Date:</strong> {book.startDate || "-"}</p>
          <p><strong>End Date:</strong> {book.endDate || "-"}</p>
          <p><strong>Category:</strong> {book.category || "-"}</p>
          <p>
            <strong>Genres:</strong>{" "}
            {book.genres && book.genres.length > 0
              ? book.genres.join(", ")
              : "None"}
          </p>
          <p><strong>Synopsis:</strong> {book.synopsis || "No synopsis"}</p>
          <p>
            <strong>Tags:</strong>{" "}
            {book.tags && book.tags.length > 0 ? book.tags.join(", ") : "None"}
          </p>
        </div>

        {/* Progress bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${book.progress || 0}%` }}
          >
            {book.progress ? `${book.progress}%` : "0%"}
          </div>
        </div>
      </div>
    </div>
  );
}