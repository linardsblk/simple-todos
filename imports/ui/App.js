import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js'; // Collection

import { Task } from './Task.js'; // Component

// App component - represents the whole app
function App(props) {

    const textInput = useRef();
    useEffect(() => textInput.current && textInput.current.focus());

    const [hideCompleted, setHideCompleted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const text = textInput.current.value.trim();


        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        textInput.current.value = '';
    }

    const renderTasks = () => {
        let filteredTasks = props.tasks;

        if (hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    return (
        <div className="container">
            <header>
                <h1>Todo List ({props.incompleteCount})</h1>


                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly
                        checked={hideCompleted}
                        onClick={() => setHideCompleted(!hideCompleted)}
                    />
                    Hide Completed Tasks
                </label>
                <form className="new-task" onSubmit={(e) => handleSubmit(e)} >
                    <input
                        type="text"
                        ref={textInput}
                        placeholder="Type to add new tasks"
                    />
                </form>
            </header>

            <ul>
                {renderTasks()}
            </ul>
        </div>
    );
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
})(App);


