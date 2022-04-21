import { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AuthContext from "../auth/AuthContext";

// Getting the host.
const host = process.env.REACT_APP_HOST;

const NoteState = (props) => {

  // Notes hook.
  const [notes, setNotes] = useState([]);

  // Get the auth-token from auth context.
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;

  // This fuction creates the request header.
  const getHeader = () => {
    const requestHeader = new Headers({
      'Content-Type': 'application/json',
      'auth-token': authToken
    });

    return requestHeader;
  } 

  // This function calls the backend Note API.
  const callNoteAPI = async (url, header, methodName = 'GET', data = {}) => {
    
    let response = null;

    if (methodName !== 'GET') {
      response = await fetch(url, {
        method: methodName, 
        mode: 'cors', 
        headers: header,
        body: JSON.stringify(data) 
      });
    } else {
      response = await fetch(url, {
        method: methodName, 
        mode: 'cors', 
        headers: header, 
      });
    }

    return response.json();
  }

  // This function fetches all notes for a user.
  const fetchAllNotes = async () => {
    
    // Get the Request header.
    const myHeader = getHeader();

    // Request URL.
    const apiEndPoint = "api/notes/getnotes";
    const url = host + apiEndPoint;

    // Call the API and set the result into note hook.
    let noteList = await callNoteAPI(url, myHeader);
    setNotes(noteList);
  }

  // This function adds a note for a user.
  const addNote = async (note) => {
    
    // Get the Request header.
    const myHeader = getHeader();

    // Request URL.
    const apiEndPoint = "api/notes/addnote";
    const url = host + apiEndPoint;

    // Call the API and set the result into note hook.
    let noteAdded = await callNoteAPI(url, myHeader, 'POST', note);

    setNotes(notes.concat(noteAdded));
  }

  // This function deletes a Note for a user.
  const deleteNote = async (id) => {

    // Get the Request header.
    const myHeader = getHeader();

    // Request URL.
    const apiEndPoint = "api/notes/deletenote/";
    const url = host + apiEndPoint + id;

    // Call the API and set the result into note hook.
    let noteDeleted = await callNoteAPI(url, myHeader, 'DELETE');

    setNotes(notes.filter((note) => { return note._id !== noteDeleted._id}));
  }

  // This function edits a Note for a user.
  const editNote = async (note) => {
    
    // Get the Request header.
    const myHeader = getHeader();

    // Request URL.
    const apiEndPoint = "api/notes/updatenote/";
    const url = host + apiEndPoint + note._id;

    // Call the API and set the result into note hook.
    let noteUpdated = await callNoteAPI(url, myHeader, 'PUT', note);

    let noteList = notes.filter((note) => {return note._id !== noteUpdated._id});
    noteList.push({...noteUpdated, ...note});   
    setNotes(notes.concat(noteList));
  }

  return (
    <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
