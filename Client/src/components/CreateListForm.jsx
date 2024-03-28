import React, { useState } from 'react';
import "./TaskMng.css";
//form for creating new task list
//showForm (show form ot not) and onCreateList(handelscreating new task list) are props from parent component (TaskMng)
const CreateListForm = ({ showForm, onCreateList }) => {

    //state to store the input value from the form field
    const [listName, setListName] = useState('');

    //update the listName state as the user types into the input field
    const handleChange = (event) => {
        setListName(event.target.value);
    };

    //this func prevents default behaviour, calls onCreateList from parent (taskMng) and resrets input field
    const handleSubmit = (event) => {
        event.preventDefault();
        onCreateList(listName); //pass the listName to parent component TaskMng
        setListName(''); //reset the input field
    }

    if (!showForm) {
        return null; //if showForm is false hide the form
    }
    return (
        <form onSubmit={(handleSubmit)}>
            <input className="listInput" type="text" placeholder="Task List Name" value={listName} onChange={handleChange} />
            <button className="listSubmitButton" type="submit">Create</button>
        </form>
    );
};


export default CreateListForm