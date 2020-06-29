import React from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export function Task(props) {

    const taskClassName = props.task.checked ? 'checked' : '';

    const toggleChecked = () => {
        Meteor.call('tasks.setChecked', props.task._id, !props.task.checked);
    }
    
    const deleteThisTask = () => {
        Meteor.call('tasks.remove', props.task._id);
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