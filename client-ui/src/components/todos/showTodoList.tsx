import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom"; // added
import UpdateTodo from "./updateTodo"; /// added

const TodoCard = ({
  data,
  handleEdit,
  handleDelete
}: {
  data: any;
  handleEdit: any;
  handleDelete: any;
}) => {
  const { _id, title, description } = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        {/* <button className="button">edit</button>
        <button className="button">delete</button> */}
        <button name={_id} className="button" onClick={handleEdit}>
          edit
        </button>
        <button name={_id} className="button" onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
};

const showTodoList = () => {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false); //added
  const [id, setId] = useState(""); // added
  const [update, setUpdate] = useState(false); // added

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todo")
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]); // updated

  const handleEdit = (e: any) => {
    // added
    setId(e.target.name);
    setOpen(true);
  };

  const handleUpdate = (e: any) => {
    // added
    console.log("Updated: ", update, !update);
    setUpdate(!update);
  };

  const handleDelete = (e: any) => {
    // added
    axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  };

  const handleClose = (e: any) => {
    setId("");
    setOpen(false);
  };

  return (
    <section className="container">
      <Link to="/create-todo" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            <TodoCard
              data={data}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      </section>
      {/* added */}
      {open ? (
        <section className="updated-container">
          <div className="updated-contents">
            <p onClick={handleClose} className="close">
              &times;
            </p>

            <UpdateTodo
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
};

export default showTodoList;
