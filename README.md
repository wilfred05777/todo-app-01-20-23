### MERN TODO - APP

<hr>

##### Part 1: Creating Backend

###### 1. Initializing our Project

<hr>

1. Create new folder and name it anything meaning to your project e.g todo-list app / company name software app

```
npm init -y
```

- note: dapat icommit first sa Git ang para dili mag serparate ang frontend/react pag sa version control.

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

####

<hr >

##### Part 2: Creating Frontend

###### Create React app

- for this project I'm going to used (tailwindcss)[https://tailwindcss.com/docs/guides/create-react-app]

```
npx create-react-app my-project
cd my-project

npm install -D tailwindcss
npx tailwindcss init
```

```

```
