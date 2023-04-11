const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const dbPath = path.join(__dirname, "../../../db/db.json");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading the database");
    }
    const notes = JSON.parse(data);
    return res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString();

  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading the database");
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(dbPath, JSON.stringify(notes), "utf-8", (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error writing to the database");
      }

      return res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading the database");
    }

    try {
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== id);
      fs.writeFile(dbPath, JSON.stringify(notes), "utf-8", (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error writing to the database");
        }

        return res.sendStatus(200);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error parsing the database");
    }
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;
