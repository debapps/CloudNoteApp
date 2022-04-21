import React from "react";
import Footer from "./components/Footer";
import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import NavAlert from "./components/NavAlert";
import RouteElement from "./components/RouteElement";


export default function App() {


  return (
    <>
      <AuthState>
        <NoteState>
          <AlertState>
            <NavAlert />
            <RouteElement/>
          </AlertState>
          <Footer footNote="Made with 💟 Debaditya Bhar" />
        </NoteState>
      </AuthState>
    </>
  );
}
