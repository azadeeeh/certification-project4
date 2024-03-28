import React, { useState } from 'react';
import TaskForm from './CreateTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm, createList, addTaskToList, deleteList, deleteTask, updateListName, updateTaskName } from '../feature/TaskMngSlice';
import "./TaskMng.css";

const TaskList = () => {
    const [showTaskForm, setShowTaskForm] = useState({});
    const [editingListId, setEditingListId] = useState(null);
    const [editedListName, setEditedListName] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState('');

    const taskLists = useSelector((state) => state.taskMng.taskLists);
    const dispatch = useDispatch();

    const handleToggleTaskForm = (listId) => {
        setShowTaskForm(prevState => ({
            ...prevState,
            [listId]: !prevState[listId]
        }));
    };

    /**const handleAddTask = (listId, task) => {
        const taskId = Date.now();
        onAddTask(listId, { ...task, id: taskId });
        setShowTaskForm({ ...showTaskForm, [listId]: false });
    };*/

    const handleAddTask = (listId, task) => {
        dispatch(addTaskToList({ listId, task }));
        //setShowTaskForm({ ...showTaskForm, [listId]: false });
    };

    /**const handleDeleteList = (listId) => {
        onDeleteList(listId);
    };*/

    const handleDeleteList = (listId) => {
        dispatch(deleteList(listId));
    };


    /**const handleDeleteTask = (listId, taskId) => {
        onDeleteTask(listId, taskId);
    };*/

    const handleDeleteTask = (listId, taskId) => {
        dispatch(deleteTask({ listId, taskId }));
    };


    /**const handleUpdateListName = (listId, newName) => {
        onUpdateListName(listId, newName);
        setEditingListId(null);
    };*/

    const handleUpdateListName = (listId, newName) => {
        dispatch(updateListName({ listId, newName }));
        setEditingListId(null);
    };




    const handleEditListName = (listId, currentName) => {
        setEditingListId(listId);
        setEditedListName(currentName);
    };

    const handleSaveEditListName = () => {
        handleUpdateListName(editingListId, editedListName);
        setEditingListId(null);
    };

    const handleUpdateTaskName = (listId, taskId, newName) => {
        dispatch(updateTaskName({ listId, taskId, newName }));
        setEditingTaskId(null);
    };

    const handleEditTaskName = (listId, taskId, currentName) => {
        setEditingListId(null);
        setEditingTaskId(taskId);
        setEditedTaskName(currentName);
    };



    const handleSaveEditTaskName = (listId) => {
        if (editingTaskId !== null && editedTaskName !== '') {
            handleUpdateTaskName(listId, editingTaskId, editedTaskName);
            setEditingTaskId(null);
            setEditedTaskName('');
        } else {
            console.error('Invalid task ID or task name');
        }
    };



    return (
        <div>
            <h2>Task Lists</h2>
            <ul>
                {taskLists.map((list) => (
                    <li key={list.id}>
                        {editingListId === list.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedListName}
                                    onChange={(e) => setEditedListName(e.target.value)}
                                />
                                <button className='add-deleteTaskButton' onClick={handleSaveEditListName}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {list.name}

                                <button className='add-deleteTaskButton' onClick={() => handleToggleTaskForm(list.id)}>{showTaskForm[list.id] ? 'Hide Task Form' : 'Add Task'}</button>
                                <button className='add-deleteTaskButton' onClick={() => handleDeleteList(list.id)}>Delete List</button>
                                <button className='add-deleteTaskButton' onClick={() => handleEditListName(list.id, list.name)}>Edit</button>
                                {showTaskForm[list.id] && (
                                    <TaskForm
                                        onCreateTask={(task) => handleAddTask(list.id, task)}
                                    />
                                )}
                                <ul>
                                    {list.tasks && list.tasks.map((task, index) => (
                                        <li className='displayTask' key={index}>
                                            {editingTaskId === task.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={editedTaskName}
                                                        onChange={(e) => setEditedTaskName(e.target.value)}
                                                    />
                                                    <button className="add-deleteTaskButton" onClick={() => handleSaveEditTaskName(list.id)}>Save</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    {task.taskName}- Priority: {task.priority} - Status: {task.status} - Due Date: {task.dueDate}
                                                    <button className="deleteTaskButton" onClick={() => handleDeleteTask(list.id, task.id)}>Delete</button>
                                                    <button className="deleteTaskButton" onClick={() => handleEditTaskName(list.id, task.id, task.taskName)}>Edit</button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
