import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import MainTab from "./components/Maintab/Maintab";

function App() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [activeShelf, setActiveShelf] = useState(1);

  useEffect(() => {
    fetch("http://localhost:4000/shelves")
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
  };

  // Add a new shelf
  const handleAddShelf = async () => {
    const newId = shelves.length > 0 ? shelves[shelves.length - 1].id + 1 : 1;
    const newShelf = {
      id: newId,
      name: `Shelf ${newId}`,
      books: [],
      fav: false,
    };
    try {
      const res = await fetch("http://localhost:4000/newshelf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShelf),
      });

      if (!res.ok) throw new Error("Failed to add shelf");
      const { shelf } = await res.json();

      setShelves((prev) => [...prev, { ...shelf, isNaming: true}]);
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
      />
      <MainTab
        activeShelfId={activeShelf}
        shelves={shelves}
        onAddBook={handleAddBook}
        isOpen={isLeftbarOpen}
        onRenameShelf={handleRenameShelf}
      />
    </div>
  );
}

export default App;
