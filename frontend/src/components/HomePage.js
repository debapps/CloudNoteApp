import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import EditModalState from "../context/editmodal/EditModalState";
import AddNote from "./AddNote";
import EditNoteModal from "./EditNoteModal";
import NoteItem from "./NoteItem";

export default function HomePage() {
  // Get the note context.
  let noteContext = useContext(NoteContext);
  const { notes, fetchAllNotes } = noteContext;

  // Fetch all the notes as side effect depending on change of notes.
  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line
  }, [notes]);


  return (
    <div className="row" 
          style={{backgroundImage: "url('/image/background-texture.jpg')",
          minHeight: "800px"}}>
      <EditModalState>
        <div className="col-md-5">
          <AddNote />
        </div>
        <EditNoteModal />
          <div className="container col-md-7">
            <div className="row my-3">
              <h2>Your Notes</h2>
              {notes.map((note, index) => {
                return <NoteItem key={index} note={note} />;
              })}
            </div>
          </div>
      </EditModalState>
    </div>
  );
}
