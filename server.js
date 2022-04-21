
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoConnect = require('./dbConnect');

// Express application initialization.
const app = express();


// Middleware.
app.use(express.json());
app.use(cors());

// Heroku Static files.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
} 

// Available Routes.
app.use("/api/notes", require('./routes/notes'));
app.use("/api/auth", require('./routes/auth'));

// Listening to port.
const port = process.env.PORT;

app.listen(port, (err) => {
  if (!err) {
    // Connect to Mongo DB. 
    mongoConnect();
    console.log(`Server is listening on port: ${port}`);
  }
})