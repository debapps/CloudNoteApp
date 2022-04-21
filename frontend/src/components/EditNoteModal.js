import React, { useContext } from "react";
import EditModalContext from "../context/editmodal/EditModalContext";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";
import EditNote from "./EditNote";

export default function EditNoteModal(props) {
  // Get the edit modal context.
  let editModalContext = useContext(EditModalContext);
  const { launchBtn, noteEdit } = editModalContext;

  // Get the note context.
  let noteContext = useContext(NoteContext);
  const { editNote } = noteContext;

  // Get the alert context.
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  // This function saves the note into database.
  const saveNote = () => {
    editNote(noteEdit);
    showAlert("success", "Your note is modified.");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editmodal"
        ref={launchBtn}
      >
        Launch Edit
      </button>

      <div
        className="modal fade"
        id="editmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-warning bg-opacity-60 text-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="editmodalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditNote />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={saveNote}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
