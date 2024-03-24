# Inventory App

A basic app for managing inventory of items by category using Mongoose/MongoDB.

## Usage

You'll need to provide a MongoDB connection string to a MongoDB project to the process using a MONGO_URI environment variable

```bash
MONGO_URI=<your-connection-string> node app.js
```

## Development

You can populate the DB with some basic information from [fakestoreapi](https://fakestoreapi.com/) by using the `populateDB.js` script. You'll need to provide a MONGO_DEV_URI environment variable to the process.

Use `npm run dev` to run the server and restart it upon changes- as well as show dev logs using the [`debug`](https://www.npmjs.com/package/debug) package.
