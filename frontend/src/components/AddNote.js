import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";

export default function AddNote() {
    // Get the note context.
    let context = useContext(NoteContext);
    const { addNote } = context;

    // Get the alert context.
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    // Set the input note hook.
    const [inputNote, setInputNote] = useState({
        title: "",
        description: "",
        tag: ""
    });

    // This function handles the changes in the text feilds on the form.
    const handleChange = (event) => {
        setInputNote((imputNote) => ({...inputNote, [event.target.name]: event.target.value}));
    }

    // This function handles the click of the submit button to add the new note.
    const handleClick = (event) => {
        event.preventDefault();
        addNote(inputNote);
        setInputNote({
            title: "",
            description: "",
            tag: ""
        });
        showAlert("success", "Your note is added.");
    }

    return (
    <div className="container">
        <div className="container my-3 bg-warning bg-opacity-70 p-3">
        <h2>Add Your Notes</h2>
        <form className="my-3 text-dark" action="" onSubmit={handleClick}>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">
                Title
            </label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={handleChange}
                value={inputNote.title}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">
                Description
            </label>
            <textarea
                className="form-control"
                id="description"
                name="description"
                onChange={handleChange}
                value={inputNote.description}
                rows="3"
            ></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">
                Tags
            </label>
            <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                onChange={handleChange}
                value={inputNote.tag}
            />
            </div>
            <button type="submit" className="btn btn-dark">
                Add Note
            </button>
        </form>
        </div>
    </div>
    );
}
