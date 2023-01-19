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
const router = router.Router();

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
