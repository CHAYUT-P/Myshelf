import React from "react";
import "./Sidebar.css";
import PlusButton from "./plus-large-svgrepo-com.svg?react";

export default function Sidebar({
  isOpen,
  shelves,
  activeShelfId,
  onSelectShelf,
  onAddShelf
}) {
  return (
    <div className={`sidebar ${isOpen ? "show" : "hide"}`}>
      {/* Favourite Section */}
      <div className="fav-sidebar">
        <div className="fav-header">
          <span className="fav-text">Favourite</span>
          <ul className="fav-list"></ul>
        </div>
      </div>

      {/* All Shelves Section */}
      <div className="all-shelves-sidebar">
        <div className="all-shelves-header">
          <span className="all-shelves-text">All Shelves</span>
          <button
            className="add-btn"
            id="add-shelf"
            onClick={onAddShelf} // ✅ call prop
          >
            <PlusButton className="add-icon" />
          </button>
        </div>

        {/* Shelf list */}
        <ul className="shelves-list">
          {shelves.map((shelf) => (
            <li
              key={shelf.id}
              className={`shelf-item ${shelf.id === activeShelfId ? "active" : ""}`}
              onClick={() => onSelectShelf(shelf.id)}
            >
              {shelf.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}