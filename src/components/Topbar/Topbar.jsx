import React, { useState } from "react";
import "./Topbar.css";
import SidebarIcon from './sidebar-2-layout-toggle-nav-navbar-svgrepo-com.svg?react';

export default function Topbar({ isOpen, toggleOpen }) {
    return (
        <>
            <div className="topbar">
                <button onClick={toggleOpen} className={`button ${isOpen ? "open" : "closed"}`}>
                    <SidebarIcon style={{ width: 24, height: 24, fill: "rgb(81, 81, 81)" }} />
                </button>
                <div className={`topbar-object ${isOpen ? "open" : "closed"}`}>

                </div>
            </div>
        </>

    );
  }
  