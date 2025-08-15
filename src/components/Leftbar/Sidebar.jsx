import React from "react";
import "./Sidebar.css";
import PlusButton from "./plus-large-svgrepo-com.svg?react";

export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "show" : "hide"}`}>
      <div className="fav-sidebar">
        <div className="fav-header">
          <span className="fav-text">Favourite</span>
          <ul className="fav-list"></ul>
        </div>
        <div className="fav-items"></div>
      </div>

      <div className="all-shelves-sidebar">
        <div className="all-shelves-header">
          <span className="all-shelves-text">All Shelves</span>
          <button className="add-btn" id="add-shelf">
            <PlusButton className="add-icon" />
          </button>
          <ul className="shelves-list"></ul>
        </div>
        <div className="all-shelves-items"></div>
      </div>
    </div>
  );
}