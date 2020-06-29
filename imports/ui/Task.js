import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export function Task(props) {

    const taskClassName = props.task.checked ? 'checked' : '';

    const toggleChecked = () => {
        Tasks.update(props.task._id, {
            $set: { checked: !props.task.checked },
        });
    }
    
    const deleteThisTask = () => {
        Tasks.remove(props.task._id);
    }
    
    return (
        <li className={taskClassName}>
            <button className="delete" onClick={deleteThisTask}>&times;</button>
            <input type="checkbox" readOnly checked={!!props.task.checked} onClick={toggleChecked} />
            <span>
                <strong>{props.task.username}</strong>: {props.task.text}
            </span>
        </li>
    );

}