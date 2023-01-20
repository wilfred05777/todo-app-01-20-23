### MERN TODO - APP

<hr>

##### Part 1: Creating Backend

###### 1. Initializing our Project

<hr>

1. Create new folder and name it anything meaning to your project e.g todo-list app / company name software app

```
npm init -y
```

- note: dapat icommit first sa Github ang para dili mag serparate ang frontend/react pag sa version control.

```
git init
```

###### 2. Setting up package.json

```
npm i cors dotenv express mongoose concurrently
```

- cors: allows cross-origin api calls
- dotenv: needed to access data from .env files
- express: web application framework for node.js
- mongoose: It is needed to define the database schema and connecting to mongoDB
- concurrently: Run multiple commands concurrently in package.json
- mongodb: command installs MongoDB database driver that allows your Node.js applications to connect to the database and work with data.

<hr>
After installing the dependencies the package.json folder should look as follows.

```
{
  "name": "todo-app-01-20-23",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node backend/server",
    "server": "nodemon backend/server",
    "frontend": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run frontend\" ",
    "data:import": "node backend/seeder -d",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"

  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "concurrently": "^7.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^6.8.4"
  }
}
```

```
ROOT
  |──frontend
  |    |──node_modules
  |    |──public
  |    |──src
  |    |   └── components
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js
  |    ├── models
  |    │   └── todo.js
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js
  |    ├── .env
  |    ├── server.js <-- we are here
  ├── package-lock.json
  └── package.json
```

```
// server.js
const express = require("express");

const app = express();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
```

<hr>
- Import mongoose
- Import MONGO_URI from .env
- Define the connectDB method for connecting to the database
- Export the connectDB method to be called in server.js

```
#.env
NODE_ENV = development
PORT=5000
MONGO_URI = mongodb+srv://wilfred:wilfredadmin@wilfredcluster.rsfdy.mongodb.net/proShop?retryWrites=true&w=majority
JWT_SECRET = abc123
PAYPAL_CLIENT_ID = AWKJb2B2c6VTCl0hCc_7K0r5A2qdXxebr3mJJfzQVxhjrR6jQ51Dvf4QRt-7aAocw7pOiwihRXv6iVOy

```

```js
// config/db.js
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

module.exports = connectDB;
```

Add the following changes in the server.js file.

- Import dotenv
- Import connectDB method from config/db.js
- Call the connectDB method.

```js
/// server.js
const express = require("express");
const connectDB = require("./config/db");

const app = express();

/// connect database
connectDB(); /// <-- added

/// initialize middleware
// app.use(express.json({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.send(`Server up and running `));

/// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

<hr>

##### MongoDB configuration guide

- [MongoDB guid](https://www.mongodb.com/languages/mern-stack-tutorial)

```js
// config/db.js
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // `mongoose.connect()` dapat naay qoutes or backticks
    const conn = await `mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })`;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

###### Define database schema

<hr>

```
ROOT
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js
  |    ├── models
  |    │   └── todo.js <--- we are here
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js
  |    ├── .env
  |    ├── server.js
  |──frontend
  |    |──node_modules
  |    |──public
  |    |──src
  |    |   └── components
  |──client-ui
  |    |──node_modules
  |    |──public
  |    |──src
  |    |   └── components
  ├── package-lock.json
  └── package.json
```

```js
// models/todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true
  },
  description: {
    type: "String"
  }
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
```

<hr>

- ###### DEFINING END POINTS

```
ROOT
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js
  |    ├── models
  |    │   └── todo.js
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js <--- we are here
  |    ├── .env
  |    ├── server.js
```

```js
/// routes/todo.js
const express = require("express");
// @ts-ignore
const router = express.Router();

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */

router.get("/");

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/");

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id");

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id");

module.exports = router;
```

<hr>

- ###### DEFINING METHODS FOR THE END POINTS

```
ROOT
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js <--- we are here
  |    ├── models
  |    │   └── todo.js
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js
  |    ├── .env
  |    ├── server.js
```

- Import Todo model from models/todo
- Define the following four methods
  - getAllTodo
  - postCreateTodo
  - putUpdateTodo
  - deleteTodo
- Export all the methods

```JS
/// controllers/todo.js

const Todo = require("../models/todo");

exports.getAllTodo = (req, res) => {
  Todo.find()
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.postCreateTodo = (req, res) => {
  Todo.create(req.body).then((data) =>
    res.json({ message: "Todo added successfully", data })
  );
};

exports.putUpdateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body).then((data) =>
    res
      .json({ message: "updated successfully", data })
      .catch((err) =>
        res
          .status(404)
          .json({ message: "Failed to update todo", error: err.message })
      )
  );
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, req.body).then((data) =>
    res
      .json({ message: "todo deleted successfully", data })
      .catch((err) =>
        res.status(404).json({ message: "todo not found", error: err.message })
      )
  );
};

```

- getAllTodo: The find() method will return all the todo in the collection. If the collection is empty then it will return a 404 error.

- postCreateTodo: The create() method will create a todo and return a success message. Otherwise, it will return a 400 error.

- putUpdateTodo: The findByIdAndUpdate() will require two parameters the id and data of the todo to be updated. The id parameter will be extracted from req.params.id.

- deleteTodo: The findByIdAndRemove() method will require only one parameter that is the id of the todo.

<hr>

- ###### ADDING THE METHODS TO THE END POINTS

```
ROOT
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js
  |    ├── models
  |    │   └── todo.js
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js <--- we are here
  |    ├── .env
  |    ├── server.js
```

- Import the methods for CRUD operations
- Adding the methods to the end points

```js
/// routes/todo.js
const express = require("express");
const router = express.Router();

const {
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo
} = require("../controllers/todo");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */

router.get("/", getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/", postCreateTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id", putUpdateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id", deleteTodo);

module.exports = router;
```

- ###### xiii. Adding the routes end points in the `server.js`

```
ROOT
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js
  |    ├── models
  |    │   └── todo.js
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js
  |    ├── .env
  |    ├── server.js <--- we are here
```

The final part of completing the backend is to add the endpoints to the server.js file.

- Import routes/todo.js
- Add the routes endpoints to the middleware

```js
/// server.js
require("dotenv").config();
const express = require("express");
// const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/// routes
const todo = require("./routes/todo"); /// added

/// connect database
connectDB(); /// added

/// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send(`Server up and running `));

/// use routes
app.use("/api/todo", todo); /// added

/// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

##### TESTING END POINTS USING POSTMAN

- Creating a todo
  - We will send a POST request to http://localhost:8000/api/todo

```
http://localhost:8000/api/todo
```

- Reading the todo
  - We will send a GET request to http://localhost:8000/api/todo

```
http://localhost:8000/api/todo
```

- Updating the todo

  - To update a todo we will send a PUT request to http://localhost:8000/api/todo/id

  -The id has to be taken from the response message of the server.

```
http://localhost:8000/api/todo/id
```

- Deleting a todo

  - To delete a todo we will send a DELETE request to http://localhost:8000/api/todo/id

```
http://localhost:8000/api/todo/id
```

<hr>

#### 4. Adding cors

- Added cors so that we can make the api calls from the frontend application like react.

```
ROOT
  |──backend
  |    ├── config
  |    │   └── db.js
  |    ├── controllers
  |    │   └── todo.js
  |    ├── models
  |    │   └── todo.js
  |    ├── node_modules
  |    ├── routes
  |    │   └── todo.js
  |    ├── .env
  |    ├── server.js <--- we are here
```

```js
// server.js
/// routes
const todo = require("./routes/todo"); /// added

/// connect database
connectDB(); /// added

/// cors
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
```

<hr >

#### Part 2: Creating Frontend

###### Create React app

```
└──todo-app-01-20-23 folder
    ├── server
    └── client-ui <-- here
```

- typescript and using [vite-react](https://tailwindcss.com/docs/guides/vite)

- for this project I'm going to used [tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)

```
npx create-react-app my-project
cd my-project

npm install -D tailwindcss
npx tailwindcss init
```

2. Installing required dependencies

```
cd client-ui
npm i node-sass axios react-router-dom sass
```

3. Cleaning the src folder
   - Delete the logo.svg
   - Remove the imports from App.js
   - Remove the following from App.js

```
├──client-ui
    ├── node_modules
    ├── public
    ├── src <---------- we are here
    │   ├── App.js
    │   ├── App.scss
    │   ├── App.test.js
    │   ├── index.js
    │   ├── reportWebVitals.js
    │   └── setupTests.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── yarn.lock
```

4.  Creating the components

```
├── node_modules
├── public
├── src
│   ├── components
|   |     ├──Pages
|   |     ├──Todos
│   │         ├── createTodo.jsx
│   │         ├── showTodoList.jsx <-- we are here
│   │         └── updateTodo.jsx
│   ├── App.js
│   ├── App.scss
│   ├── App.test.js
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

```
First, we will create the ShowTodoList component, to read all the documents that we created in the previous part while testing the backend application.

- Import useState and useEffect hooks from react
- Import axios from axios
In ShowTodoList function component will have a state todo, we will fetch the documents from the database and store it in the state todo.

We will use axios to send a GET request to the backend to fetch the document. Upon receiving the data we will store the data in todo using setTodo and log the data. If we receive an error we'll log that too.

We will make the get request from the useEffect hook, since we want the data to load when the page loads.

We will use the TodoCard component to display the contents of the todo. We will use map to iterate over todo and pass the contents to TodoCard which will display the contents of each todo document.

The contents of the showTodoList.tsx file should look something like this
```

```tsx
// showTodoList.tsx
import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const TodoCard = ({
  data
}: {
  data: any;
  _id: any;
  title: string;
  description: string;
}) => {
  const { _id, title, description } = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        <button className="button">edit</button>
        <button className="button">delete</button>
      </div>
    </li>
  );
};

const showTodoList = () => {
  const [todo, setTodo] = useState([]);

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
  }, []);

  return (
    <section className="container">
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            <TodoCard data={data} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default showTodoList;
```

```
// ii. CREATE a new todo
- We will import ShowTodoList component in the App.tsx file
- The contents of the App.js file should look something like this
```

```tsx
├── node_modules
├── public
├── src
│ ├── components
| | ├──Pages
| | ├──Todos
│ │ ├── createTodo.jsx
│ │ ├── showTodoList.jsx <-- we are here
│ │ └── updateTodo.jsx
│ ├── App.js
│ ├── App.scss
│ ├── App.test.js
│ ├── index.js
│ ├── reportWebVitals.js
│ └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock

```

#### To create a new document we will send a POST request to our server using axios.

- Import useState hook react
- Import Link from react-router-dom
- Define a function handleChange that will get the input data
- Define a function handleSubmit that will send the POST request to the server
- Declare data using useState hook with the following json

```
{
  "title": "",
  "description": ""
}
```

In handleChange method we will update the data when the input changes. We will call the setData() and declare a arrow function inside that will copy the contents of the previous data if any exists. In this e.target.name will be the name of the input element that will have either title or description.

In handleSubmit method,

- Call e.preventDefault() to prevent the page from reloading when the submit button is clicked.
- Send a POST request to the server with the data. If the data has been sent successfully to the server then reset the state data

After adding the above change the code will look something like this

```tsx
/// src/components/createTodo.tsx
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const createTodo = () => {
  const [data, setData] = useState({ title: "", description: "" });

  const handleChange = (e: any) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDafault();

    const todo = {
      title: data.title,
      description: data.description
    };

    console.log({ todo });
    axios
      .post("http://localhost:8000/api/todo", data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  };

  return (
    <section className="container">
      <Link to="/" className="button-back">
        <button className="button">back</button>
      </Link>
      <section className="contents">
        <form onSubmit={handleSubmit} className="form-container" noValidate>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="input"
          />

          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            type="text"
            className="input"
            name="description"
            value={data.description}
            onChange={handleChange}
          />

          <button type="submit" className="button">
            create todo
          </button>
        </form>
      </section>
    </section>
  );
};

export default createTodo;
```

#### iii. Update App.tsx

```tsx
├── node_modules
├── public
├── src
│ ├── components
| | ├──Pages
| | ├──Todos
│ │ ├── createTodo.jsx
│ │ ├── showTodoList.jsx
│ │ └── updateTodo.jsx
│ ├── App.tsx <-- we are here
│ ├── App.scss
│ ├── App.test.tsx
│ ├── index.tsx
│ ├── reportWebVitals.tsx
│ └── setupTests.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

##### Before we can use the CreateTodo component we need to update App.js file.

    - Import BrowserRouter and Route from react-router-dom
    - Import CreateTodo component from components/createTodo
    - Create a Route for home page / and pass the ShowTodoList component
    - Create a Route for creating a new todo /create-todo
    - Wrap the Routes inside of the BrowserRouter
    - After making the changes the App.js file should look something like this

```tsx
/// src/app.tsx
import { useState } from "react";
import "./App.scss";

import ShowTodoList from "./components/todos/showTodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTodo from "./components/todos/createTodo";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app-contents">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowTodoList />} />
          <Route path="/create-todo" element={<CreateTodo />} />
          {/* <ShowTodoList/> */}
        </Routes>
      </BrowserRouter>
      {/* <h1 className="text-3xl text-red-900 font-bold underline">
        Hello world!
      </h1> */}
    </div>
  );
};

export default App;
```

###### Since we have not added the button to navigate to http://localhost:3000/create-todo you can type this in your browser to check the CreateTodo component.

##### iv. Adding the Link to navigate to /create-todo to showTodoList.jsx

```tsx
├── node_modules
├── public
├── src
│ ├── components
| | ├──Pages
| | ├──Todos
│ │ ├── createTodo.jsx
│ │ ├── showTodoList.jsx <-- we are here
│ │ └── updateTodo.jsx
│ ├── App.tsx
│ ├── App.scss
│ ├── App.test.tsx
│ ├── index.tsx
│ ├── reportWebVitals.tsx
│ └── setupTests.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

    - Import Link from react-router-dom
    - Wrap a button inside of Link tag

```tsx
import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom"; // added

const TodoCard = ({ data }: { data: any }) => {
  const { _id, title, description } = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        <button className="button">edit</button>
        <button className="button">delete</button>
      </div>
    </li>
  );
};

const showTodoList = () => {
  const [todo, setTodo] = useState([]);

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
  }, []);

  return (
    <section className="container">
      {/* added <Link></Link> */}
      <Link to="/create-todo" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            <TodoCard data={data} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default showTodoList;
```

#### v. Creating the UpdateTodo component to send UPDATE request

```tsx
├── node_modules
├── public
├── src
│ ├── components
| | ├──Pages
| | ├──Todos
│ │ ├── createTodo.jsx
│ │ ├── showTodoList.jsx
│ │ └── updateTodo.jsx <-- we are here
│ ├── App.tsx
│ ├── App.scss
│ ├── App.test.tsx
│ ├── index.tsx
│ ├── reportWebVitals.tsx
│ └── setupTests.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

- Import useState from react
- Import axios from axios

The UpdateTodo component will have 3 props

- \_id
- handleClose
- handleEdited

###### The updateTodo.tsx file may look something like this.

```tsx
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
```

###### vi. Adding the method to DELETE a todo

```tsx
├── node_modules
├── public
├── src
│ ├── components
| | ├──Pages
| | ├──Todos
│ │ ├── createTodo.jsx
│ │ ├── showTodoList.jsx <-- we are here
│ │ └── updateTodo.jsx
│ ├── App.tsx
│ ├── App.scss
│ ├── App.test.tsx
│ ├── index.tsx
│ ├── reportWebVitals.tsx
│ └── setupTests.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

###### We will make the following changes in showTodoList.jsx

    - Define a function handleDelete that will send a DELETE request to the server. This function will need the _id of the document to delete the document from the database. It will also update the array todo with the filtered array.
    - Pass the handleDelete method as a prop to TodoCard
    - Update TodoCard component to have the parameter handleDelete
    -Add an onClick event for the button delete and pass the handleDelete method

###### After making the changes, the code will look something like this

```tsx
import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
// added
const TodoCard = ({ data, handleDelete }: { data: any; handleDelete: any }) => {
  const { _id, title, description } = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        <button name={_id} className="button">
          edit
        </button>
        // added
        <button name={_id} className="button" onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
};

const showTodoList = () => {
  const [todo, setTodo] = useState([]);

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
  }, []);

  return (
    <section className="container">
      <Link to="/create-todo" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            // added
            <TodoCard data={data} handleDelete={handleDelete} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default showTodoList;
```

#### vii. Adding the UpdateTodo component in showTodoList.tsx

```tsx
├── node_modules
├── public
├── src
│ ├── components
| | ├──Pages
| | ├──Todos
│ │ ├── createTodo.jsx
│ │ ├── showTodoList.jsx
│ │ └── updateTodo.jsx <-- we are here
│ ├── App.tsx
│ ├── App.scss
│ ├── App.test.tsx
│ ├── index.tsx
│ ├── reportWebVitals.tsx
│ └── setupTests.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

###### We need to add the following changes in the showTodoList.jsx

    - Import UpdateTodo component from updateTodo.jsx

    - Declare open using the useState hook with the default value of false. The value of open will be either true or false. We will conditionally render the UpdateTodo component. If the edit button is clicked on any one of the todo then we will set open to true when the UpdateTodo component will be rendered.
    - Declare id using the useState hook. The \_id of the todo document to be updated will be stored. It will be passed as a prop to UpdateTodo component.

    - Declare update using the useState hook. This will be used to fetch all the todo documents from the database. Each time a todo document has been updated then update will change between true and false

    - Define a function handleEdit. It will update the state id with the \_id of the document and update the state of open to true. The UpdateTodo component will be rendered.

    - Define a function handleUpdate. This will invert the state of update if the todo has been updated by the user. Inverting the state will cause the useEffect hook to update the todo array.

    - Define a function handleClose. We need this to close the UpdateTodo component. This will set id to an empty string and set open to false.

###### Update the TodoCard component

    - Pass the handleEdit function to the TodoCard component.
    - Pass the handleEdit prop to the edit button.

###### After making the above changes, the code will look something like this

```tsx
import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom"; // added

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
            <TodoCard data={data} handleDelete={handleDelete} />
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
```
