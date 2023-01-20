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

####

<hr >

#### Part 2: Creating Frontend

###### Create React app

- typscript and using [vite-react](https://tailwindcss.com/docs/guides/vite)

- for this project I'm going to used [tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)

```
npx create-react-app my-project
cd my-project

npm install -D tailwindcss
npx tailwindcss init
```

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
