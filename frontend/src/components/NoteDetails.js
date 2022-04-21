import React, {useContext} from "react";
import { useParams, Link } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

function NoteDetails() {

    // Get the note context.
    let noteContext = useContext(NoteContext);
    const { notes } = noteContext;

    // Get the note ID.
    let noteID  = useParams().id;
    
    // Get the corresponding notes.
    let noteDetails = notes.filter((note) => { return note._id === noteID});
    const {title, description, tag} = noteDetails[0];

    return (
        <>
            <div className="container border mx-10 my-5 p-4 bg-warning bg-opacity-50 text-dark shadow-lg p-3 mb-5 rounded">
                <h1 className="display-4"> {title} </h1>
                <p className="lead mt-3">{description}</p>
                <p className="text-muted mt-5"><em>Tags: {tag}</em></p>
                <Link to="/" className="btn btn-dark btn-lg" role="button">Go to Home</Link>
            </div>
        </>
    );
}

export default NoteDetails