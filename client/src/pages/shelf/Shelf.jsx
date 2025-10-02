import { useState, useEffect } from "react";
import "./Shelf.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import MainTab from "../../components/Maintab/Maintab";
import { useNavigate } from "react-router-dom";

function Shelf() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [activeShelf, setActiveShelf] = useState(null);
  const [activeAccount, setActiveAccount] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4000/activeAccount", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setActiveAccount(data))
      .catch((err) => console.error(err));
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4000/accountShelf", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const frontendData = data.map((shelf) => ({
          ...shelf,
          isNaming: false,
        }));
        setShelves(frontendData);
        if (frontendData.length > 0) {
          setActiveShelf(frontendData[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, [token]);

  const toggleLeftbar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
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

  // ✅ Add shelf with JWT
  const handleAddShelf = async () => {
    try {
      const newId = shelves.length > 0 ? shelves[shelves.length - 1].id + 1 : 1;
      const newShelf = {
        id: newId,
        name: `Shelf ${newId}`,
        books: [],
        fav: false,
      };

      const res = await fetch("http://localhost:4000/newshelf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  const handleRenameShelf = (id, newName) => {
    setShelves((prev) =>
      prev.map((shelf) =>
        shelf.id === id ? { ...shelf, name: newName, isNaming: false } : shelf
      )
    );
  };

  const handleAddBook = async (shelfId, book) => {
    try {
      const res = await fetch(`http://localhost:4000/shelves/${shelfId}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      const { book: savedBook } = await res.json();

      setShelves((prev) =>
        prev.map((shelf) =>
          shelf.id === shelfId
            ? { ...shelf, books: [...shelf.books, savedBook] }
            : shelf
        )
      );
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleEditBook = async (shelfId, updatedBook) => {
    try {
      const res = await fetch(
        `http://localhost:4000/shelves/${shelfId}/books/${updatedBook.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBook),
        }
      );

      if (!res.ok) throw new Error("Failed to update book");
      const { book: savedBook } = await res.json();

      setShelves((prev) =>
        prev.map((shelf) =>
          shelf.id === shelfId
            ? {
                ...shelf,
                books: shelf.books.map((b) =>
                  b.id === savedBook.id ? savedBook : b
                ),
              }
            : shelf
        )
      );
    } catch (error) {
      console.error("❌ Error updating book:", error);
    }
  };

  const handleDeleteShelf = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/shelves/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete shelf");

      setShelves((prev) => prev.filter((shelf) => shelf.id !== id));

      if (activeShelf === id) {
        setActiveShelf(shelves.length > 0 ? shelves[0].id : null);
      }
    } catch (err) {
      console.error("Error deleting shelf:", err);
    }
  };

  const onFavShelf = (id) => {
    setShelves((prev) =>
      prev.map((shelf) =>
        shelf.id === id ? { ...shelf, fav: !shelf.fav } : shelf
      )
    );
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