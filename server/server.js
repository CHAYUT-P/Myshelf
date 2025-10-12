import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

let shelves = [];
let accounts = []
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // user.id will be available
    next();
  });
}

app.post("/newshelf", authenticateToken, (req, res) => {
  const shelf = {
    id: req.body.id,
    name: req.body.name,
    books: [],
    fav: false,
    userId: req.user.id,
  };

  shelves.push(shelf);
  res.status(201).json({ message: "Shelf added", shelf });
});

app.get("/shelves", (req, res) => {
  res.json(shelves);
});

app.get("/accountShelf", authenticateToken, (req, res) => {
  const userShelves = shelves.filter((shelf) => shelf.userId === req.user.id);
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

  if (book.bookType === "single") {
    Object.assign(book, req.body);
  }

  else if (book.bookType === "series") {
    if (req.body.books && Array.isArray(req.body.books)) {
      book.books = req.body.books;
    }

    Object.assign(book, req.body);
  }

  res.json({ message: "Book updated successfully", book });
});
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAccount = {
    id: Date.now(),
    email,
    username,
    password: hashedPassword,
  };

  accounts.push(newAccount);

  const token = jwt.sign({ id: newAccount.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({ message: "Account added", account: newAccount, token });
});

app.post("/login", async(req, res) => {
  const { username, email, password } = req.body;

  // Find account by username OR email
  const user = accounts.find(
    (a) =>
      (a.username === username || a.email === email)
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Save active account
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });

});



app.get("/account", (req, res) => {
  res.json(accounts);
});

app.get("/activeAccount", authenticateToken, (req, res) => {
  const activeUser = accounts.find((a) => a.id === req.user.id);
  if (!activeUser) {
    return res.status(404).json({ message: "No active account" });
  }
  res.json(activeUser);
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});