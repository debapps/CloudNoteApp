import React, { useContext } from 'react';
import Alert from './Alert';
import Navbar from './Navbar';
import AlertContext from "../context/alert/AlertContext";

export default function NavAlert() {

    // Get the alert context.
    const alertContext = useContext(AlertContext);
    const { alertObj } = alertContext;

    return (
        <>
            <Navbar />
            <Alert alert={alertObj}/>
         </>
    );
}
