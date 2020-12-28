import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  function toTodo(task) {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggle={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    );
  }

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: Math.random() < 0.5 ? false: true};
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => (task.id !== id)));
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function getTasks() {
    let x;
    switch (curView) {
      case "All":
        x = tasks;
        break;
      case "Active":
        x = tasks.filter(task => task.completed === false);
        break;
      case "Completed":
        x = tasks.filter(task => task.completed === true);
        break;
    }
    return x.map(task => toTodo(task));
  }


  const [tasks, setTasks] = useState(props.tasks);
  const [curView, setView] = useState("All");

  return (
    <div className="todoapp stack-large">
      <h1>ToDo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="All" call={setView}/>
        <FilterButton name="Active" call={setView}/>
        <FilterButton name="Completed" call={setView}/>
      </div>
      <h2 id="list-heading">
        { getTasks().length } { getTasks().length !== 1 ? 'tasks' : 'task'} remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {getTasks()}
      </ul>
    </div>
  );
}

export default App;
