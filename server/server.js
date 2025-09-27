import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

let shelves = [{ id: 1, name: "Shelf 1", books: [] , fav: false}];
let accounts = []

app.post("/newshelf", (req, res) => {
  const shelf = req.body;
  shelves.push(shelf);
  res.status(201).json({ message: "Shelf added", shelf });
});

app.get("/shelves", (req, res) => {
  res.json(shelves);
});

app.delete("/shelves/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  shelves = shelves.filter((shelf) => shelf.id !== id);
  res.json({ message: "Shelf deleted" });
});

app.get("/shelves/:id", async (req, res) =>{
  const id = parseInt(req.params.id);
  const shelf = shelves.find((shelf) => shelf.id === id);
  res.json(shelf);
})

app.get("/shelves/:id/books", async (req, res) =>{
  const id = parseInt(req.params.id);
  const shelf = shelves.find((shelf) => shelf.id === id);
  res.json(shelf.books);
})

app.post("/shelves/:id/books", async (req, res) =>{
  const id = parseInt(req.params.id);
  const newbook = req.body
  const shelf = shelves.find((shelf) => shelf.id === id);
  newbook.id = Date.now();
  shelf.books.push(newbook)

  res.json({ book: newbook })
})

// GET book by shelfId + bookId
app.get("/shelves/:shelfId/books/:bookId", (req, res) => {
  const shelfId = parseInt(req.params.shelfId);
  const bookId = parseInt(req.params.bookId);

  const shelf = shelves.find((s) => s.id === shelfId);
  if (!shelf) {
    return res.status(404).json({ message: "Shelf not found" });
  }

  const book = shelf.books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

app.put("/shelves/:shelfId/books/:bookId", (req, res) => {
  const shelfId = parseInt(req.params.shelfId);
  const bookId = parseInt(req.params.bookId);

  const shelf = shelves.find((s) => s.id === shelfId);
  if (!shelf) return res.status(404).json({ message: "Shelf not found" });

  const book = shelf.books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  Object.assign(book, req.body);
  res.json({book});
});

app.listen(PORT, () => {
console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  const newAccount = {
    id: Date.now(),
    email,
    username,
    password,
  };

  accounts.push(newAccount);
  res.status(201).json({ message: "Account added", account: newAccount });
});

app.get("/register", (req, res) => {
  res.json(accounts);
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});