import { useState } from "react";
import AuthContext from "./AuthContext";

const host = process.env.REACT_APP_HOST;

const AuthState = (props) => {

    // Storing auth token as application state.
    const [authToken, setAuthToken] = useState(null);
    
    // Storing user info as application state.
    const [userInfo, setUserInfo] = useState({
        success: false,
        userDetails: {}
    });

    // This function calls the backend API for authentications.
    const callAuthAPI = async (url, header, methodName, data = {}) => {
        
        let response = null;

        if (methodName === 'GET') {
            response = await fetch(url, {
                method: methodName, 
                mode: 'cors', 
                headers: header, 
            });
        } else {
            response = await fetch(url, {
                method: methodName, 
                mode: 'cors', 
                headers: header,
                body: JSON.stringify(data) 
                });
        }
        
        return response.json()
    }

    // This function is called when user try to login.
    const loginUser = async (loginInfo) => {

        // Get the login URL.
        const endPoint = "api/auth/login";
        const url = host + endPoint;

        // Request header.
        const loginHeader = new Headers({
            'Content-Type': 'application/json'
        });

        let response = await callAuthAPI(url, loginHeader, "POST", loginInfo);

        if (response.success) {
            setAuthToken(response.authToken);
            return {success: response.success, message: "Login Successful"} 
        } else {
            return {success: response.success, message: response.message};
        }

    }

    // This function returns the user details.
    const getUserInfo = async () => {

        // Get the login URL.
        const endPoint = "api/auth/getuser";
        const url = host + endPoint;

        // Request header.
        const loginHeader = new Headers({
            'Content-Type': 'application/json',
            'auth-token': authToken
        });

        let response = await callAuthAPI(url, loginHeader, "GET");

        if (response.success) {
            setUserInfo(response);
        } else {
            setUserInfo({success: response.success, userDetails: {}});
        }

    }

    // This function is called when user try to sign up.
    const signUpUser = async (signUpInfo) => {

        // Get the login URL.
        const endPoint = "api/auth/createuser";
        const url = host + endPoint;

        // Request header.
        const signUPHeader = new Headers({
            'Content-Type': 'application/json'
        });

        let response = await callAuthAPI(url, signUPHeader, "POST", signUpInfo);

        if (response.success) {
            setAuthToken(response.authToken);
            return {success: response.success, message: "Sign Up Successful"} 
        } else {
            return {success: response.success, message: response.message};
        }

    }

    // This function log out the existing user.
    const logOutUser = () => {
        setAuthToken(null);
    }


    return(
        <AuthContext.Provider value={{authToken, loginUser, signUpUser, logOutUser, userInfo, getUserInfo}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;

