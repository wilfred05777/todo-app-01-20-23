import React from "react";
import { useState } from "react";
import axios from "axios";

const updateTodo = ({
  _id,
  handleClose,
  handleEdited
}: {
  _id: any;
  handleClose: any;
  handleEdited: any;
}) => {
  const [data, setData] = useState({ title: "", description: "" });

  const handleChange = (e: any) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log({ _id }, { data });

    axios
      .put(`http://localhost:8000/api/todo/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  };
  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        handleSubmit(e);
        handleEdited();
        handleClose();
      }}
    >
      <label htmlFor="title" className="label">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="input"
        onChange={handleChange}
      />
      <label htmlFor="description" className="label">
        Description
      </label>
      <input
        type="text"
        name="description"
        className="input"
        onChange={handleChange}
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default updateTodo;
