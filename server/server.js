import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("HELLO from GET 🚀");
});

app.post("/", (req, res) => {
const data = req.body;
res.json({ message: "HELLO from POST 🚀", youSent: data });
});

// Start server
app.listen(PORT, () => {
console.log(`✅ Server running at http://localhost:${PORT}`);
});