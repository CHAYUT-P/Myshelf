import React, { useState } from "react";
import "./Topbar.css";
import SidebarIcon from './sidebar-2-layout-toggle-nav-navbar-svgrepo-com.svg?react';
import FavIcon from '../../assets/icons/star-svgrepo-com (1).svg?react'

export default function Topbar({ 
    isOpen, 
    toggleOpen ,
    currentShelf,   
    onFavShelf,
    shelves,
    }){

    const shelf = shelves.find(s => s.id === currentShelf);

    return (
        <>
            <div className="topbar">
                <button onClick={toggleOpen} className={`button ${isOpen ? "open" : "closed"}`}>
                    <SidebarIcon style={{ width: 24, height: 24, fill: "rgb(81, 81, 81)" }} />
                </button>
                <div className={`topbar-object ${isOpen ? "open" : "closed"}`}>
                    <div>
                        <button className="favbutton"
                        onClick={() =>onFavShelf(currentShelf)}
                        >
                            <FavIcon width="1.5em" height="1.5em"  className={`favIcon ${shelf.fav ? "fav" : ""}`}/>
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
  }
  