import React, {useContext} from "react";
import EditModalContext from "../context/editmodal/EditModalContext";

export default function EditNote(props) {
  
    // Get the edit modal context.
    let editModalContext = useContext(EditModalContext);
    const { noteEdit, setNoteEdit } = editModalContext;

    // This function handles the changes in the text feilds on the form.
    const handleChange = (event) => {
        setNoteEdit((noteEdit) => ({...noteEdit, [event.target.name]: event.target.value}));
    }

    return (
    <form className="my-3" action="">
        <div className="mb-3">
        <label htmlFor="title" className="form-label">
            Title
        </label>
        <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={noteEdit.title}
            onChange={handleChange}
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
            rows="3"
            value={noteEdit.description}
            onChange={handleChange}
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
            value={noteEdit.tag}
            onChange={handleChange}
        />
        </div>
    </form>
    );
}
