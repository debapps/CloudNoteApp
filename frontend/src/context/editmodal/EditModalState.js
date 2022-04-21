import { useRef , useState } from 'react';
import EditModalContext from './EditModalContext';

export default function EditModalState (props) {
    
    const launchBtn = useRef(null);

    const [noteEdit, setNoteEdit] = useState({
        _id: "",
        title: "",
        description: "",
        tag: ""
      });
    
    return (
        <EditModalContext.Provider value={{launchBtn, noteEdit, setNoteEdit}}>
            {props.children}
        </EditModalContext.Provider>
    );
}