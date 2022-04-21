import React, {useContext} from "react";
import NoteContext from "../context/notes/NoteContext";
import EditModalContext from "../context/editmodal/EditModalContext";
import AlertContext from "../context/alert/AlertContext";
import { Link } from "react-router-dom";


export default function NoteItem(props) {
  const { _id, title, description, tag } = props.note;
  
  // Get the note context.
  let noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;

  // Get the edit modal context.
  let editModalContext = useContext(EditModalContext);
  const {launchBtn, setNoteEdit} = editModalContext;

  // Get the alert context.
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  const handleEdit = () => {    
    setNoteEdit(props.note);
    launchBtn.current.click();
  }

  const handleDelete = () => {
    deleteNote(_id);
    showAlert("success", "Your note is removed.");
  }

  return (
    <>
      <div className="col-md-6 my-3">
        <div className="card rounded-3 bg-warning bg-opacity-50 text-dark mx-3 shadow-lg p-3 mb-5 rounded">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description.slice(0, 100)} ... <Link to={`/note/${_id}`}>Read More</Link> 
            </p>
            <p className="card-text">{tag}</p>
            <div className="d-flex">
              <span className="material-icons" style={{cursor: "pointer"}} onClick={handleEdit}>edit_note</span>
              <span className="material-icons" style={{cursor: "pointer"}} onClick={handleDelete}>delete</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
