import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {

    // Alert hooks.
    const [alertObj, setAlertObj] = useState(null);

    // This function set type and message of the alert.
    // available types:
    // primary, secondary, success, danger, warning, info, light, dark.
    function showAlert (type, message) {
        // Set the alert.
        setAlertObj({
            type: type,
            msg: message
        });

        // Fade the alert after 1.5s.
        setTimeout(() => {
            setAlertObj(null);
        }, 1500);
    }

    return (
        <AlertContext.Provider value={{alertObj, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;