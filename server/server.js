import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

let shelves = [];
let accounts = []
let activeID = null
let activeshelf = []

app.post("/newshelf", (req, res) => {
  if (!activeID) {
    return res.status(401).json({ message: "No active account" });
  }

  const shelf = {
    id: req.body.id,
    name: req.body.name,
    books: [],
    fav: false,
    userId: activeID,
  };

  shelves.push(shelf);
  res.status(201).json({ message: "Shelf added", shelf });
});

app.get("/shelves", (req, res) => {
  res.json(shelves);
});

app.get("/accountShelf", (req, res) => {
  const userId = parseInt(req.query.userId);

  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }

  const userShelves = shelves.filter((shelf) => shelf.userId === userId);
  res.json(userShelves);
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

app.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  const newAccount = {
    id: Date.now(),
    email,
    username,
    password,
  };
  activeID = newAccount.id
  accounts.push(newAccount);
  res.status(201).json({ message: "Account added", account: newAccount });
});

app.post("/login", (req, res) => {
  const { username, email, password } = req.body;

  // Find account by username OR email
  const user = accounts.find(
    (a) =>
      (a.username === username || a.email === email) &&
      a.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Save active account
  activeID = user.id;

  res.json({ message: "Login successful", account: user });
});



app.get("/account", (req, res) => {
  res.json(accounts);
});

// get the currently active account
app.get("/activeAccount", (req, res) => {
  const activeUser = accounts.find(a => a.id === activeID);
  if (!activeUser) {
    return res.status(404).json({ message: "No active account" });
  }
  res.json(activeUser);
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});