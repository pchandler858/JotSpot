const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString();

  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading the database");
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error writing to the database");
      }

      return res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    const clicked = req.params.id;
    const json = JSON.parse(data);
    const filtered = json.filter((note) => note.id !== clicked);
    fs.writeFile("./db/db.json", JSON.stringify(filtered), (err) => {
      console.log("note deleted");
    });
    if (filtered.length === 0) {
      fs.writeFile("./db/db.json", "[]", (err) => {
        console.log("all notes deleted");
      });
    }
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
