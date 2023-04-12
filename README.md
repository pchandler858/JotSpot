# JotSpot - Note Taker App

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

This is a simple note-taking application built with Express.js, which allows users to create, read, update, and delete notes. The application uses a JSON file as a database to store the notes.

## Link to deployed website

- [Deployed Website](https://jot-spot.herokuapp.com/)

## Prerequisites

- Node.js installed on your local machine

## Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory in your terminal.
3.  Run `npm install` to install the dependencies.
4.  Create a `db.json` file in the `db` directory, if not already present.
5.  Start the application by running `node app.js` or `npm start` in your terminal.

## Usage

- Access the application in your web browser at `http://localhost:3000` or the appropriate port number if you have specified a different one.
- Click on "Get Started" to navigate to the notes page.
- On the notes page, you can view existing notes, create new notes, update existing notes, and delete notes.
- Notes are automatically saved when created or updated.
- To delete a note, click on the trash icon next to the note.
- To update a note, click on the note and edit the title and content, then click on the save icon to save the changes.

## API Endpoints

- `GET /api/notes`: Fetches all notes from the database in JSON format.
- `POST /api/notes`: Adds a new note to the database.
- `DELETE /api/notes/:id`: Deletes a note from the database by ID.

## Technologies Used

- Express.js
- Node.js
- HTML
- CSS
- JavaScript

## Demonstration

![screen-gif](/public/demo.gif)
