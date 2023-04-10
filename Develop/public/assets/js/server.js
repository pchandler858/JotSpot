const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

let notes = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString();
  notes.push(newNote);
  return res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
