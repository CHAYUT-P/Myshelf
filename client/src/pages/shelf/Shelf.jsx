import { useState, useEffect } from "react";
import "./Shelf.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import MainTab from "../../components/Maintab/Maintab";

function Shelf() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [activeShelf, setActiveShelf] = useState(1);
  const [activeAccount,setActiveAccount] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/activeAccount")
      .then((res) => res.json())
      .then((data) => {
        setActiveAccount(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("activeUserId");
    if (!userId) {
      console.log("No logged in user, redirect to login");
      return;
    }
  
    fetch(`http://localhost:4000/accountShelf?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const frontEndData = data.map((shelf) => ({
          ...shelf,
          isNaming: false,
        }));
        setShelves(frontEndData);
        if (frontEndData.length > 0) {
          setActiveShelf(frontEndData[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleLeftbar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
    console.log(shelves);
    console.log(activeAccount);
  };

  const handleUpdateBook = (shelfId, updatedBook) => {
    setShelves((prev) =>
      prev.map((shelf) =>
        shelf.id === shelfId
          ? {
              ...shelf,
              books: shelf.books.map((b) =>
                b.id === updatedBook.id ? updatedBook : b
              ),
            }
          : shelf
      )
    );
  };

  // Add a new shelf
  const handleAddShelf = async () => {
    const userId = localStorage.getItem("activeUserId");
    if (!userId) {
      alert("No logged in user");
      return;
    }
  
    const newId = shelves.length > 0 ? shelves[shelves.length - 1].id + 1 : 1;
    const newShelf = {
      id: newId,
      name: `Shelf ${newId}`,
      books: [],
      fav: false,
      userId: parseInt(userId), // 👈 tie to active user
    };
  
    try {
      const res = await fetch("http://localhost:4000/newshelf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShelf),
      });
  
      if (!res.ok) throw new Error("Failed to add shelf");
      const { shelf } = await res.json();
  
      setShelves((prev) => [...prev, { ...shelf, isNaming: true }]);
      setActiveShelf(newId);
    } catch (err) {
      console.error("Error adding shelf:", err);
    }
  };

  // Select a shelf
  const handleSelectShelf = (id) => {
    setActiveShelf(id);
  };

  const startRenaming = (id) => {
    setShelves((prev) =>
      prev.map((shelf) =>
        shelf.id === id ? { ...shelf, isNaming: true } : shelf
      )
    );
  };

  // Rename a shelf
  const handleRenameShelf = (id, newName) => {
    const updatedShelves = shelves.map((shelf) =>
      shelf.id === id ? { ...shelf, name: newName, isNaming: false } : shelf
    );
    setShelves(updatedShelves);
  };

  const handleAddBook = async (shelfId, book) => {
    try {
      const res = await fetch(`http://localhost:4000/shelves/${shelfId}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      const { book: savedBook } = await res.json();
      
      const updatedShelves = shelves.map((shelf) =>
        shelf.id === shelfId
          ? { ...shelf, books: [...shelf.books, savedBook] }
          : shelf
      );
  
      setShelves(updatedShelves);
    } catch (error) {
      console.error("Error deleting shelf:", err);
    }
  };

  const handleEditBook = async (shelfId, updatedBook) => {
    try {
      const res = await fetch(
        `http://localhost:4000/shelves/${shelfId}/books/${updatedBook.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        }
      );
  
      if (!res.ok) throw new Error("Failed to update book");
      const { book: savedBook } = await res.json();
  
      setShelves((prevShelves) =>
        prevShelves.map((shelf) =>
          shelf.id === shelfId
            ? {
                ...shelf,
                books: shelf.books.map((book) =>
                  book.id === savedBook.id ? savedBook : book
                ),
              }
            : shelf
        )
      );
  
      console.log("✅ Book updated:", savedBook);
    } catch (error) {
      console.error("❌ Error updating book:", error);
    }
  };

  const handleDeleteShelf = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/shelves/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Failed to delete shelf");
  
      const updatedShelves = shelves.filter((shelf) => shelf.id !== id);
      setShelves(updatedShelves);
  
      if (activeShelf === id) {
        setActiveShelf(updatedShelves.length > 0 ? updatedShelves[0].id : null);
      }
    } catch (err) {
      console.error("Error deleting shelf:", err);
    }
  };

  const onFavShelf = (id) => {
    const updatedShelves = shelves.map((shelf) =>
      shelf.id === id ? { ...shelf, fav: !shelf.fav } : shelf
    );
    setShelves(updatedShelves);
    console.log(shelves);
  };

  return (
    <div>
      <Topbar
        isOpen={isLeftbarOpen}
        toggleOpen={toggleLeftbar}
        currentShelf={activeShelf}
        onFavShelf={onFavShelf}
        shelves={shelves}
      />
      <Sidebar
        isOpen={isLeftbarOpen}
        shelves={shelves}
        activeShelfId={activeShelf}
        onSelectShelf={handleSelectShelf}
        onAddShelf={handleAddShelf}
        onRenameShelf={handleRenameShelf}
        startRenaming={startRenaming}
        onDeleteShelf={handleDeleteShelf}
        onFavShelf={onFavShelf}
        activeAccount={activeAccount}
      />
      <MainTab
        activeShelfId={activeShelf}
        shelves={shelves}
        onAddBook={handleAddBook}
        isOpen={isLeftbarOpen}
        onRenameShelf={handleRenameShelf}
        handleUpdateBook={handleUpdateBook}
        onEditBook={handleEditBook}
      />
    </div>
  );
}

export default Shelf;
