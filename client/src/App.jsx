import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import MainTab from "./components/Maintab/Maintab";

function App() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  const [shelves, setShelves] = useState([
    { id: 1, name: "Shelf 1", isNaming: false, books: [] , fav: false}
  ]);
  const [activeShelf, setActiveShelf] = useState(1);

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
  
  const startRenaming = (id) => {
    setShelves(prev =>
      prev.map(shelf =>
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

  const handleAddBook = (shelfId, book) => {
    const updatedShelves = shelves.map((shelf) =>
      shelf.id === shelfId
        ? { ...shelf, books: [...shelf.books, { ...book, id: Date.now() }] }
        : shelf
    );
    setShelves(updatedShelves);
  };

  const handleDeleteShelf = (id) => {
    const updatedShelves = shelves.filter(shelf => shelf.id !== id);
    setShelves(updatedShelves);
  
    // ถ้าสำคัญ ต้องเช็คว่า shelf ที่ active ถูกลบหรือไม่
    if (activeShelf === id) {
      setActiveShelf(updatedShelves.length > 0 ? updatedShelves[0].id : null);
    }
  };

  const onFavShelf = (id) => {
    const updatedShelves = shelves.map((shelf) =>
      shelf.id === id ? { ...shelf, fav:!shelf.fav} : shelf
    );  
    setShelves(updatedShelves);
    console.log(shelves)
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
