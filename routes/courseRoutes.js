// routes/courseRoutes.js

const express = require('express');
const Course = require('../models/Course'); // Ensure this path is correct

const router = express.Router();

// Dynamically generate routes for BSIS and BSIT courses for each year
const programs = ['BSIS', 'BSIT'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

programs.forEach(program => {
    years.forEach(year => {
        router.get(`/${program.toLowerCase()}/${year.replace(/\s/g, '-').toLowerCase()}`, async (req, res) => {
            try {
                const courses = await Course.find({ 
                    program: program,
                    year: year 
                })
                .sort('code')
                .select('code description units tags year program -_id');
                res.json(courses);
            } catch (error) {
                res.status(500).send(error);
            }
        });
    });
});

module.exports = router;
