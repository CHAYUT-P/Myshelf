import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import MainTab from "./components/Maintab/Maintab";

function App() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  const [shelves, setShelves] = useState([
    { id: 1, name: "Shelf 1", isNaming: false, books: [] }
  ]);
  const [activeShelf, setActiveShelf] = useState(1);

  // Toggle sidebar
  const toggleLeftbar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
  };

  // Add a new shelf
  const handleAddShelf = () => {
    const newId = shelves.length > 0 ? shelves[shelves.length - 1].id + 1 : 1;
    const newShelf = { id: newId, name: `Shelf ${newId}`, isNaming: true, books: [] };
    const updatedShelves = [...shelves, newShelf];
    setShelves(updatedShelves);
    setActiveShelf(newId);
  };

  // Select a shelf
  const handleSelectShelf = (id) => {
    setActiveShelf(id);
  };

  // Rename a shelf
  const handleRenameShelf = (id, newName) => {
    const updatedShelves = shelves.map((shelf) =>
      shelf.id === id ? { ...shelf, name: newName, isNaming: false } : shelf
    );
    setShelves(updatedShelves);
  };

  // Add a book to a shelf
  const handleAddBook = (shelfId, bookName) => {
    const updatedShelves = shelves.map((shelf) =>
      shelf.id === shelfId
        ? { ...shelf, books: [...shelf.books, { id: Date.now(), name: bookName }] }
        : shelf
    );
    setShelves(updatedShelves);
  };

  return (
    <div>
      <Topbar isOpen={isLeftbarOpen} toggleOpen={toggleLeftbar} />
      <Sidebar
        isOpen={isLeftbarOpen}
        shelves={shelves}
        activeShelfId={activeShelf}
        onSelectShelf={handleSelectShelf}
        onAddShelf={handleAddShelf}
        onRenameShelf={handleRenameShelf}
      />
      <MainTab
        activeShelfId={activeShelf}
        shelves={shelves}
        onAddBook={handleAddBook}
        isOpen={isLeftbarOpen}
      />
    </div>
  );
}

export default App;
