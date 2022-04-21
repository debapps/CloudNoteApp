import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";

export default function UserDetails() {

    // Get the auth context.
    const authContext = useContext(AuthContext);
    const { userInfo, getUserInfo } = authContext;

    // Load the user details.
    useEffect(() => {
        getUserInfo();
    });
    
    // Get the user details.
    const {userName, emailID, dateCreated} = userInfo.userDetails;
   
    return (
        <div className="container">
            <h1 className="my-5 text-warning display-4">My Account Details</h1>
            <table className="table table-warning table-striped border border-warning">
                <tbody>
                    <tr>
                        <th scope="row">
                            Name
                        </th>
                        <td>{userName}</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            Email
                        </th>
                        <td>{emailID}</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            Creation Date
                        </th>
                        <td>{dateCreated}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
