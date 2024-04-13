"use strict";

const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const sequelize = require('../database/connection'); // Import your Sequelize instance
const Student = require('../models/Student'); // Import your model...If you are not going to import model
//sequilize is not going to create a table for you

app.get('/', (req, res) => {
  return res.json("From Backend Side");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Asynchronous function to connect to the database and start the server
async function startServer() {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('Connection to database has been established successfully.');
    await sequelize.sync(); // Synchronize the model with the database (create table if it doesn't exist)
    console.log('Student model has been synchronized with the database.');

    // Enable CORS for all routes
    app.use(cors());
    app.get('/api/data', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://my-react-app.com'); // Replace with allowed origin
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed HTTP methods
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed request headers

      // Send your API response
      res.json({
        message: 'CORS enabled!'
      });
    });

    // Get All Students
    app.get('/get/students', async (req, res) => {
      try {
        const students = await Student.findAll(); // Fetch all students
        res.json(students);
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Error fetching students'
        });
      }
    });

    // GET student by ID
    app.get('/get/students/:id', async (req, res) => {
      try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
          res.status(404).json({
            message: 'Student not found'
          });
        } else {
          res.json(student);
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Error fetching student'
        });
      }
    });
    app.use(express.json()); // This middleware parses JSON data
    // POST a new student
    app.post('/post/students', async (req, res) => {
      try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent); // 201 for create
      } catch (err) {
        console.error(err);
        res.status(400).json({
          message: 'Error creating student'
        });
      }
    });

    // PUT update a student
    app.put('/put/students/:id', async (req, res) => {
      try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
          res.status(404).json({
            message: 'Student not found'
          });
        } else {
          await student.update(req.body);
          res.json(student);
        }
      } catch (err) {
        console.error(err);
        res.status(400).json({
          message: 'Error updating student'
        });
      }
    });

    // DELETE a student
    app.delete('/delete/students/:id', async (req, res) => {
      try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
          res.status(404).json({
            message: 'Student not found'
          });
        } else {
          await student.destroy();
          res.json({
            message: 'Student deleted successfully'
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Error deleting student'
        });
      }
    });
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process if connection fails
  }
}
startServer();