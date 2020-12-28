import React, {useState} from "react";

export default function Todo (props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);

  function handleChange(e) {
    setName(e.target.value);
    console.log(e.target.value);
  }

  /*
  function handleSubmit(e) {
    e.preventDefault();
    props.edi
    */

  const editingTemplate = (
      <form className="stack-small">
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input 
            id={props.id} 
            className="todo-text" 
            type="text" 
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn todo-cancel" 
            onClick={() => {
              setEditing(false);
              setName(props.name);
            }}
          >
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button 
            type="submit" 
            className="btn btn__primary todo-edit"
            onClick={(e) => {
              e.preventDefault();
              console.log(props.id);
              console.log(name);
              props.editTask(props.id, name);
              setEditing(false);
            }}
          >
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
  );
  const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggle(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button 
              type="button" 
              className="btn"
              onClick={() => setEditing(true)}
            >
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)}
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
      </div>
  );
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
