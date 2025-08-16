import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Leftbar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

function App() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  const [shelves, setShelves] = useState([{ id: 1, name: "Shelf 1" }]);
  const [activeShelf, setActiveShelf] = useState(1);

  const handleAddShelf = () => {
    let newId;

    if (shelves.length > 0) {
      newId = shelves[shelves.length - 1].id + 1;
    } else {
      newId = 1;
    }

    const newShelf = { id: newId, name: `Shelf ${newId}` };
    const updatedShelves = [...shelves, newShelf];

    setShelves(updatedShelves);
    setActiveShelf(newId);
  };

  const handleSelectShelf = (id) => {
    setActiveShelf(id);
  };

  const toggleLeftbar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
  };

  // Find current shelf
  const nowActiveShelf = shelves.find((s) => s.id === activeShelf) || null;

  return (
    <div>
      <Topbar isOpen={isLeftbarOpen} toggleOpen={toggleLeftbar} />
      <Sidebar
        isOpen={isLeftbarOpen}
        shelves={shelves}
        activeShelfId={activeShelf}
        onSelectShelf={handleSelectShelf}
        onAddShelf={handleAddShelf}
      />
    </div>
  );
}

export default App;