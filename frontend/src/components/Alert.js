import React from 'react';
import PropTypes from 'prop-types';

export default function Alert(props) {
    
    // // This function capitalizes the first letter of the word.
    // function capitalize(word) {
    //     let firstLetter = word.slice(0, 1).toUpperCase();
    //     let newWord = firstLetter + word.slice(1);
    //     return newWord;
    // }

    return (
        props.alert && 
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} 
            role="alert">
            <strong>{props.alert.msg}</strong>
        </div>
    );
}

Alert.propTypes = {
    alert: PropTypes.object
}


