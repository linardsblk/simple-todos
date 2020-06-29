import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js'; // Collection

import { Task } from './Task.js'; // Component

// App component - represents the whole app
function App(props) {

    const textInput = useRef();

    useEffect(() => textInput.current && textInput.current.focus());

    const handleSubmit = (event) => {
        event.preventDefault();

        const text = textInput.current.value.trim();


        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        textInput.current.value = '';
    }

    const renderTasks = (tasks) => {
        return tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    return (
        <div className="container">
            <header>
                <h1>Todo List</h1>
            </header>

            <form className="new-task" onSubmit={(e) => handleSubmit(e)} >
                <input
                    type="text"
                    ref={textInput}
                    placeholder="Type to add new tasks"
                />
            </form>
            <ul>
                {renderTasks(props.tasks)}
            </ul>
        </div>
    );
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);


