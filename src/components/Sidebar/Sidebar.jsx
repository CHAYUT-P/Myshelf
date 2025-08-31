import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import PlusButton from "./plus-large-svgrepo-com.svg?react";

export default function Sidebar({
  isOpen,
  shelves,
  activeShelfId,
  onSelectShelf,
  onAddShelf,
  onRenameShelf,
  onDeleteShelf,
  startRenaming,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const sidebarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isOpen ? "show" : "hide"}`}
    >
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
          <button className="add-btn" id="add-shelf" onClick={onAddShelf}>
            <PlusButton className="add-icon" />
          </button>
        </div>

        <ul className="shelves-list">
          {shelves.map((shelf) => (
            <li
              key={shelf.id}
              className={`shelf-item ${
                shelf.id === activeShelfId ? "active" : ""
              } ${openMenuId === shelf.id ? "menu-open" : ""}`}
              onClick={() => onSelectShelf(shelf.id)}
            >
              {shelf.isNaming ? (
                <input
                  className="naming-input"
                  type="text"
                  defaultValue={shelf.name}
                  autoFocus
                  onBlur={(e) => onRenameShelf(shelf.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      onRenameShelf(shelf.id, e.target.value);
                  }}
                />
              ) : (
                <div className="shelf-row">
                  <span className="shelf-name">{shelf.name}</span>

                  <button
                    className="more-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === shelf.id ? null : shelf.id);
                    }}
                  >
                    ...
                  </button>

                  {openMenuId === shelf.id && (
                    <div
                      className="dropdown-menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          startRenaming(shelf.id);
                        }}
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          onDeleteShelf(shelf.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
