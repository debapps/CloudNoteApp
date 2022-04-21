import React from 'react';
import { useLocation, Link } from "react-router-dom";

export default function ErrorPage() {
    const location = useLocation();

    return (
        <div className="jumbotron container my-5">
            <h1 className="display-4">Opps.. It's Error 404!</h1>
            <p className="lead">
                You wanna go somewhere, but came to <em>{location.pathname}</em> which is middle of nowhere!
            </p>
            <hr className="my-4"/>
            <p>
                If you need right direction, <strong>Keep calm and Press the button...</strong>
            </p>
            <Link to="/" className="btn btn-dark btn-lg" role="button">Go to Home</Link>
        </div>
    )
}
