// Initialize a constant object to store data, accessible from all routes
const projectData = {};

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an instance of an Express app
const app = express();

/* Middleware */
// Configure body-parser to parse request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all domains
app.use(cors());

// Serve static files from the directory named "website"
app.use(express.static("website"));

// Set up the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

// GET route that returns the current project data
app.get("/all", (req, res) => {
  res.status(200).send(projectData);
});

// POST route to receive and add data
app.post("/add", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  res.status(201).send(projectData); // Send back the updated project data with a 201 Created status
});
