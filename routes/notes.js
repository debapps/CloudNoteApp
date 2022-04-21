const express = require("express");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const getUserByToken = require("../middleware/getUser");

// Initialize the router.
const router = express.Router();

// Route 1: Creation of a note for the Logged-in user.
// Route: /api/notes/addnote. Method: POST. Log in required.

router.post(
  "/addnote",
  getUserByToken,
  [
    body("title", "Notes Title Should not be Blank!").isLength({ min: 1 }),
    body("description", "Note Description should be atleast 6 chars.").isLength(
      { min: 6 }
    ),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get the request values.
    const { title, description, tag } = req.body;

    try {
      // Create a new note for the logged in user.
      let note = new Note({
        user: req.userID,
        title: title,
        description: description,
        tag: tag,
      });

      // Save the note in mongoDB.
      let savedNote = await note.save();

      // Send the saved note as response with success.
      res.status(200).json(savedNote);

    } catch (err) {
      //console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
);

// Route 2: Fetches all the notes for the Logged-in user.
// Route: /api/notes/getnotes. Method: GET. Log in required.

router.get("/getnotes", getUserByToken, async (req, res) => {
  try {
    // Get all the notes for a user.
    let notes = await Note.find({ user: req.userID });

    // Send all the notes as response with success. 
    res.status(200).json(notes);

  } catch (err) {
    //console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});

// Route 3: Update the existing Note for the Logged-in user.
// Route: /api/notes/updatenote/:noteID. Method: PUT. Log in required.

router.put(
  "/updatenote/:noteID",
  getUserByToken,
  [
    body("title", "Notes Title Should not be Blank!").isLength({ min: 1 }),
    body("description", "Note Description should be atleast 6 chars.").isLength(
      { min: 6 }
    ),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get the request values.
    const { title, description, tag } = req.body;
    const noteID = req.params.noteID;
    const userID = req.userID;

    // Create a new note with all the updated values.
    let newNote = {};
    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }

    if (tag) {
      newNote.tag = tag;
    }

    try {
      // Get the existing note from the database.
      let curNote = await Note.findById(noteID);

      // If the note not found.
      if (!curNote) {
        return res.status(404).json({ message: "Note not Found!" });
      }

      // If the user is not valid.
      if (curNote.user.toString() !== userID) {
        return res.status(401).json({ message: "Unautherized Access!" });
      }

      // Update the exiting note with the request body.
      let updatedNote = await Note.findByIdAndUpdate(noteID, { $set: newNote });

      // Send the note updated as response with success. 
      res.status(200).json(updatedNote);

    } catch (err) {
      //console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
);

// Route 4: Delete the existing Note for the Logged-in user.
// Route: /api/notes/deletenote/:noteID. Method: DELETE. Log in required.

router.delete("/deletenote/:noteID", getUserByToken, async (req, res) => {
  // Get the request values.
  const noteID = req.params.noteID;
  const userID = req.userID;

  try {
    // Get the existing note from the database.
    let curNote = await Note.findById(noteID);

    // If the note not found.
    if (!curNote) {
      return res.status(404).json({ message: "Note not Found!" });
    }

    // If the user is not valid.
    if (curNote.user.toString() !== userID) {
      return res.status(401).json({ message: "Unautherized Access!" });
    }

    // Delete the note with given note id.
    let deletedNote = await Note.findByIdAndDelete(noteID);

    // Send the note deleted as response with success. 
    res.status(200).json(deletedNote);
    
  } catch (err) {
    //console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
