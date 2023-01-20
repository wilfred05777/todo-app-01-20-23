import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";

import axios from "axios";

const createTodo = () => {

  const[data, setData] = useState({ title: "", description: ""})

  const handleChange =(e:any) => {
    setData((data) => ({...data, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e:any) =>{
    e.preventDafault();

    const todo ={
      title: data.title,
      description: data.description
    }

    console.log({todo})
    axios
      .post("http://localhost:8000/api/todo", data)
      .then((res) =>{
        setData({title: "", description:""})
        console.log(res.data.message)
      })
      .catch((err) =>{
        console.log("Error couldn't create TODO")
        console.log(err.message)
      })
  }

  return (
    <section className="container">
      <Link to="/" className="button-back">
        <button className="button">
          back
        </button>
      </Link>
      <section className="contents">
        <form 
          onSubmit={handleSubmit}
          className="form-container"
          noValidate
        > 
        <label className="label" htmlFor="title">
          Title
        </label>
        <input type="text" name="title" value={data.title} onChange={handleChange} className="input" />

        <label htmlFor="description" className="label">Description</label>
        <input type="text" className="input" name="description" value={data.description} onChange={handleChange}/>

        <button type="submit" className="button">
          create todo
        </button>
        </form>
      </section>
    </section>
  )
};

export default createTodo;
