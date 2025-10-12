import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import PlusButton from "./plus-large-svgrepo-com.svg?react";
import TrashIcon from "../../assets/icons/trash-bin-trash-svgrepo-com-2.svg?react";
import RenameIcon from "../../assets/icons/mobile-rename-ui-svgrepo-com.svg?react"
import FavouriteIcon from "../../assets/icons/star-svgrepo-com (1).svg?react"

export default function Sidebar({
  isOpen,
  shelves,
  activeShelfId,
  onSelectShelf,
  onAddShelf,
  onRenameShelf,
  onDeleteShelf,
  startRenaming,
  onFavShelf,
  activeAccount,
  
}) {
  const [openMenu, setOpenMenu] = useState({ section: null, id: null });
  const sidebarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenMenu({ section: null, id: null });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    // 🧹 Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("activeUserId");
    localStorage.removeItem("username");
    window.location.href = "/login";
  
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isOpen ? "show" : "hide"}`}
      onClick={() => setOpenMenu({ section: null, id: null })}
    >
      <div className="account">
        <button onClick={logOut}>Logout</button>
      </div>
      {/* Favourite Section */}
      <div className="fav-sidebar">
        <div className="fav-header">
          <span className="fav-text">Favourite</span>
        </div>
        <ul className="shelves-list">
            {shelves
              .filter(shelf => shelf.fav)
              .map(shelf => (
                <li
                  key={shelf.id}
                  className={`shelf-item ${
                    shelf.id === activeShelfId ? "active" : ""
                  } ${openMenu.id === shelf.id ? "menu-open" : ""}`}
                  onClick={() => onSelectShelf(shelf.id)}
                >
                  {shelf.isNaming ? (
                    <input
                      className="naming-input"
                      type="text"
                      defaultValue={shelf.name}
                      autoFocus
                      onBlur={(e) => handleRenameShelf(shelf.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameShelf(shelf.id, e.target.value);
                      }}
                    />
                  ) : (
                    <div className="shelf-row">
                      <span className="shelf-name">{shelf.name}</span>
                      <button
                        className="more-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(prev =>
                            prev.id === shelf.id && prev.section === "fav"
                              ? { section: null, id: null }
                              : { section: "fav", id: shelf.id }
                          );
                        }}
                      >
                        ...
                      </button>

                      {openMenu.id === shelf.id && openMenu.section === "fav" && (
                        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => { setOpenMenu({ section: null, id: null }); startRenaming(shelf.id); }}>
                            <RenameIcon width="1.3em" height="1.3em" className="icon" />Rename
                          </button>
                          <button onClick={() => { setOpenMenu({ section: null, id: null }); onDeleteShelf(shelf.id); }}>
                            <TrashIcon width="1.3em" height="1.3em" className="icon" />Move to Trash
                          </button>
                          <button onClick={() => { setOpenMenu({ section: null, id: null }); onFavShelf(shelf.id); }}>
                            <FavouriteIcon width="1.3em" height="1.3em" className={`favicon ${shelf.fav ? "fav" : ""}`} />Favourite
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </li>
              ))}
          </ul>
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
              } ${openMenu.id === shelf.id ? "menu-open" : ""}`}
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
                      setOpenMenu(prev =>
                        prev.id === shelf.id && prev.section === "all"
                          ? { section: null, id: null }
                          : { section: "all", id: shelf.id }
                      );
                    }}
                  >
                    ...
                  </button>

                  {openMenu.id === shelf.id && openMenu.section === "all" && (
                    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { setOpenMenu({ section: null, id: null }); startRenaming(shelf.id); }}>
                        <RenameIcon width="1.3em" height="1.3em" className="icon" />Rename
                      </button>
                      <button onClick={() => { setOpenMenu({ section: null, id: null }); onDeleteShelf(shelf.id); }}>
                        <TrashIcon width="1.3em" height="1.3em" className="icon" />Move to Trash
                      </button>
                      <button onClick={() =>onFavShelf(shelf.id)}>
                        <FavouriteIcon width="1.3em" height="1.3em" className={`favicon ${shelf.fav ? "fav" : ""}`} />Favourite
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
