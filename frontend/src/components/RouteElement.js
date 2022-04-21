import React, {useContext} from 'react';
import { Routes, Route } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import PublicPage from './PublicPage';
import UserDetails from './UserDetails';
import NoteDetails from './NoteDetails';


export default function RouteElement() {

    // Get the auth-token from auth context.
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;

    return (
    <>
    <Routes>
        <Route exact path="/" element={ authToken ? <HomePage /> : <PublicPage/> } />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/note/:id" element={<NoteDetails />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/userdetails" element={<UserDetails />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="*" element={<ErrorPage />} />
    </Routes>
    </>
    );
}
