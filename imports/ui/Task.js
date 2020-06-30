import React from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { format } from 'timeago.js';


// Task component - represents a single todo item
export function Task(props) {


    const toggleChecked = () => {
        Meteor.call('tasks.setChecked', props.task._id, !props.task.checked);
    }

    const deleteThisTask = () => {
        Meteor.call('tasks.remove', props.task._id);
    }

    const togglePrivate = () => {
        Meteor.call('tasks.setPrivate', props.task._id, !props.task.private);
    }

    const taskClassName = classnames({
        checked: props.task.checked,
        private: props.task.private,
    });

    return (
        <li className={taskClassName}>
            
            {
                props.isOwner &&
                <button className="delete" onClick={deleteThisTask}>&times;</button>
            }

            {
                props.currentUserId &&
                <input type="checkbox" readOnly checked={!!props.task.checked} onClick={toggleChecked} />
            }

            

            {
                props.isOwner &&
                <button className="toggle-private" onClick={togglePrivate}>
                    {props.task.private ? 'Private' : 'Public'}
                </button>
            }

            <span>
                <strong>{props.task.username}</strong>: {props.task.text}
            </span>

            <span className ="time-ago">{format(props.task.createdAt)}</span>
        </li>
    );

}