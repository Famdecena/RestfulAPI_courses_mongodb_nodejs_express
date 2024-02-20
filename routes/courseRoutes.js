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
            Tags: course.tags.join(", ") // Optional: Convert tags array to string for easy reading
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
        const backendCourses = await Course.find({ tags: "Backend" }).sort('description'); // Assuming 'description' is the course name
        res.json(backendCourses);
    } catch (error) {
        res.status(500).send(error);
    }
});
//FOR: Retrieve all published BSIS (Bachelor of Science in Information Systems) 
//APPROACH: Summary of those of BSIS
router.get('/bsis/summary', async (req, res) => {
    try {
        const bsisCourses = await Course.find({ program: 'BSIS' })
            .sort('code')
            .select('code description -_id');
        
        const summary = bsisCourses.map(course => ({
            Code: course.code,
            Name: course.description
        }));

        res.json({ program: 'BSIS', summary });
    } catch (error) {
        res.status(500).send(error);
    }
});
//FOR: Retrieve BSIT (Bachelor of Science in Information Technology) courses
//APPROACH: Summary of those of BSIT
router.get('/bsit/summary', async (req, res) => {
    try {
        const bsitCourses = await Course.find({ program: 'BSIT' })
            .sort('code')
            .select('code description -_id');
        
        const summary = bsitCourses.map(course => ({
            Code: course.code,
            Name: course.description
        }));

        res.json({ program: 'BSIT', summary });
    } catch (error) {
        res.status(500).send(error);
    }
});
// FOR BOTH
// APPROACH: Combined Summary
router.get('/courses/summary', async (req, res) => {
    try {
        const allCourses = await Course.find({ program: { $in: ['BSIS', 'BSIT'] } })
            .sort('program code')
            .select('program code description -_id');
        
        const summary = allCourses.map(course => ({
            Program: course.program,
            Code: course.code,
            Name: course.description
        }));

        res.json({ summary });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
