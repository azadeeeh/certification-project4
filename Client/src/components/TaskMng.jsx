import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm, createList, addTaskToList, deleteList, deleteTask, updateListName, updateTaskName, setTaskLists } from '../feature/TaskMngSlice';

import CreateListForm from './CreateListForm'; // Import the TaskForm component
import TaskList from './TaskList';
import "./TaskMng.css";


//main component of the task manager
//localStorage: https://chat.openai.com/share/6987d91c-ad3d-4677-9601-0b4ab3da17c4

const TaskMng = () => {
    //state for the button to be true or false depends on toggling state
    //const [showForm, setShowForm] = useState(false);
    const showForm = useSelector((state) => state.taskMng.showForm);
    //state for storing the list of task lists
    //const [taskLists, setTaskLists] = useState([]);
    const taskLists = useSelector((state) => state.taskMng.taskLists);
    const dispatch = useDispatch();


    //load saved task lists
    useEffect(() => {
        const savedTaskLists = JSON.parse(localStorage.getItem('taskLists'));
        if (savedTaskLists) {
            dispatch(setTaskLists(savedTaskLists));
        }

    }, [dispatch]);







    //save task lists to local storage
    useEffect(() => {
        localStorage.setItem('taskLists', JSON.stringify(taskLists));
    }, [taskLists]);

    /** 
    //toggle value of showForm to control visibility of the create list form
    const toggleForm = () => {
        setShowForm(!showForm);
    };
    */

    const handleToggleForm = () => {
        dispatch(toggleForm());
    };

    //whne a new task is created this function gets listName as input
    // and generates a unique id
    //it also updates the taskLists state 
    const handleCreateList = (listName) => {
        dispatch(createList(listName));
    };

    //adding new task to a list

    const handleAddTaskToList = (listId, task) => {
        dispatch(addTaskToList({ listId, task }));
    };

    /** 
    const handleAddTaskToList = (listId, task) => {
        const taskId = Date.now();
        console.log("New Task ID:", taskId); // Log the generated taskId
        console.log("Task to be added:", task); // Log the task being added
        //find the list with the matching list id
        const updatedTaskLists = taskLists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    tasks: [...list.tasks, { ...task, id: taskId }] //add unique id to the task
                };
            }
            return list;
        });
        setTaskLists(updatedTaskLists);
    };
    */


    //updating taskLists

    const handleDeleteList = (listId) => {
        dispatch(deleteList(listId));
    };

    /**const handleDeleteList = (newTaskLists) => {
        setTaskLists(newTaskLists);
    };*/





    //delete a task from taskList

    const handleDeleteTask = (listId, taskId) => {
        dispatch(deleteTask({ listId, taskId }));
    };

    /**const handleDeleteTask = (listId, taskId) => {
        const updatedTaskLists = taskLists.map(list => {
            console.log(taskId);
            if (list.id === listId) {
                return {
                    ...list,
                    tasks: list.tasks.filter(task => task.id !== taskId)

                };

            }
            console.log(list);
            return list;

        });
        setTaskLists(updatedTaskLists);
        console.log(taskLists);
    };*/

    //logging the updated taskList
    useEffect(() => {
        console.log(taskLists);
    }, [taskLists]);

    //update list name

    const handleUpdateListName = (listId, newName) => {
        dispatch(updateListName({ listId, newName }));
    };

    /**const handleUpdateListName = (listId, newName) => {
        const updatedTaskLists = taskLists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    name: newName
                };
            }
            return list;
        });
        setTaskLists(updatedTaskLists);
    };*/

    const handleUpdateTaskName = (listId, taskId, newName) => {
        dispatch(updateTaskName({ listId, taskId, newName }));
    };




    return (
        <div className="tasksListContainer">

            <h1>Welcome</h1>
            <button className='createListButton' onClick={handleToggleForm} >Create a new Task List</button>
            <CreateListForm showForm={showForm} onCreateList={handleCreateList} />

            <TaskList
                taskLists={taskLists}
                onAddTask={handleAddTaskToList}
                onDeleteList={handleDeleteList}
                onDeleteTask={handleDeleteTask}
                onUpdateListName={handleUpdateListName}
                onUpdateTaskName={handleUpdateTaskName}
            />



        </div>
    )
}

export default TaskMng