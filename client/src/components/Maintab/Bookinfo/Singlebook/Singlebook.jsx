import React from "react";
import "./Singlebook.css";

export default function SingleBook({ book }) {
  return (
    <div className="main">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author || "Unknown"}</p>
      <p><strong>Pages:</strong> {book.pages || "-"}</p>
      <p><strong>Status:</strong> {book.status || "Not started"}</p>
      <p><strong>Progress:</strong> {book.progress || 0}%</p>
    </div>
  );
}