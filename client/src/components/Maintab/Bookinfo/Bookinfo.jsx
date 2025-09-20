import React, { useState, useEffect } from "react";
import "./Bookinfo.css";

export default function BookInfo({
  activeShelfId,
  shelves, 
  isOpen, 
  onClose
}) {
  
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
            <div className="modal-title-bar">
            <span></span>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
      </div>
    </div>

  );
}
