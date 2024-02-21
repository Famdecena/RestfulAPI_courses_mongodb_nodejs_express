// routes/courseRoutes.js

const express = require('express');
const Course = require('../models/Course'); // Ensure this path is correct

const router = express.Router();

//FOR: selecting and extracting course names and specializations
//APPROACH: Route to get a single course by its code
router.get('/course/:code', async (req, res) => {
    try {
        const courseCode = req.params.code;
        const course = await Course.findOne({ code: courseCode })
            .select('description program tags -_id');
        
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        
        const courseDetail = {
            Name: course.description,
            Specialization: course.program,
           
        };

        res.json(courseDetail);
    } catch (error) {
        res.status(500).send(error);
    }
});
//FOR: Retrieve all published backend courses and sort them alphabetically by their names.
//APPROACH: clue tag "Backend"
router.get('/backend-courses', async (req, res) => {
    try {
        const backendCourses = await Course.find({ tags: "Backend" })
            .sort('description') // Sort alphabetically 
            .select('description program year -_id'); // Select description, program, and year fields

        // Transform the data to format the "Name" as "description - program - year"
        const coursesOutput = backendCourses.map(course => ({
            Name: `${course.description} - ${course.program} - ${course.year}`
        }));

        res.json(coursesOutput);
    } catch (error) {
        res.status(500).send(error);
    }
});

//FOR: Retrieve all published BSIS (Bachelor of Science in Information Systems) 
//APPROACH: Summary of those of BSIS
router.get('/bsis/summary', async (req, res) => {
    try {
        // Fetch BSIS courses and sort them by year and then code
        const bsisCourses = await Course.find({ program: 'BSIS' })
            .sort({ year: 1, code: 1 })
            .select('year code description -_id');

        // Format the response to include the program and courses categorized by year
        const formattedResponse = {
            program: 'BSIS',
            courses: bsisCourses.map(course => ({
               
                course: `${course.description} - ${course.year} - ${course.code}`,
                
            }))
        };

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});
//FOR: Retrieve BSIT (Bachelor of Science in Information Technology) courses
//APPROACH: Summary of those of BSIT
router.get('/bsit/summary', async (req, res) => {
    try {
        // Fetch BSIT courses and sort them by year and then code
        const bsitCourses = await Course.find({ program: 'BSIT' })
            .sort({ year: 1, code: 1 })
            .select('year code description -_id');

        // Format the response to include the program and courses categorized by year
        const formattedResponse = {
            program: 'BSIT',
            courses: bsitCourses.map(course => ({
               
                course: `${course.description} - ${course.year} - ${course.code}`,
                
            }))
        };

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
