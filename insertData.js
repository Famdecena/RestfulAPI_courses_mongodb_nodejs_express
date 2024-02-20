const mongoose = require('mongoose');
const Course = require('./models/Course'); 

//Connect to MongoDB
mongoose.connect('mongodb+srv://decenafam96:LjAzilMxyJlr5vL9@cluster0.nhsr4t2.mongodb.net/?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to MOngoDB')
}).catch ((error) => {
  console.log()
}) 

const rawData = [
  {
    program: "BSIS",
    courses: [
      // 1st Year BSIS Courses
      { year: "1st Year", code: "BSIS101", description: "Introduction to Information Systems", units: 3, tags: ["BSIS101", "BSIS", "Information Systems", "Introduction"] },
      { year: "1st Year", code: "BSIS102", description: "Fundamentals of Programming", units: 3, tags: ["BSIS102", "BSIS", "Programming", "Fundamentals"] },
      { year: "1st Year", code: "BSIS103", description: "Database Management Systems", units: 3, tags: ["Backend","BSIS103", "BSIS", "Database", "Management", "Systems"] },
      // 2nd Year BSIS Courses
      { year: "2nd Year", code: "BSIS201", description: "Systems Analysis and Design", units: 3, tags: ["BSIS201","Backend", "BSIS", "Systems", "Analysis", "Design"] },
      { year: "2nd Year", code: "BSIS202", description: "Object-Oriented Programming", units: 3, tags: ["BSIS202", "BSIS","Backend", "Object-Oriented", "Programming"] },
      { year: "2nd Year", code: "BSIS203", description: "Data Structures and Algorithms", units: 3, tags: ["BSIS203", "BSIS", "Data","Backend", "Structures", "Algorithms"] },
      // 3rd Year BSIS Courses
      { year: "3rd Year", code: "BSIS301", description: "Web Development", units: 3, tags: ["BSIS301", "BSIS", "Web","Backend", "Development"] },
      { year: "3rd Year", code: "BSIS302", description: "Software Engineering", units: 3, tags: ["BSIS302", "BSIS","Backend", "Software", "Engineering"] },
      { year: "3rd Year", code: "BSIS303", description: "Information Security", units: 3, tags: ["BSIS303", "BSIS", "Backend","Information", "Security"] },
      // 4th Year BSIS Courses
      { year: "4th Year", code: "BSIS401", description: "Enterprise Systems", units: 3, tags: ["BSIS401","Backend","BSIS", "Enterprise", "Systems"] },
      { year: "4th Year", code: "BSIS402", description: "Project Management", units: 3, tags: ["BSIS402", "BSIS", "Project", "Management"] },
      { year: "4th Year", code: "BSIS403", description: "Internship/Thesis", units: 3, tags: ["BSIS403", "BSIS", "Internship", "Thesis"] },
    ]
  },
  {
    program: "BSIT",
    courses: [
      // 1st Year BSIT Courses
      { year: "1st Year", code: "BSIT101", description: "Introduction to Information Technology", units: 3, tags: ["BSIT101", "BSIT", "Information Technology", "Introduction"] },
      { year: "1st Year", code: "BSIT102", description: "Programming Fundamentals", units: 3, tags: ["BSIT102", "BSIT", "Programming", "Fundamentals"] },
      { year: "1st Year", code: "BSIT103", description: "Computer Organization and Architecture", units: 3, tags: ["BSIT103", "BSIT", "Computer", "Organization", "Architecture"] },
      // 2nd Year BSIT Courses
      { year: "2nd Year", code: "BSIT201", description: "Database Management", units: 3, tags: ["BSIT201", "Backend",  "BSIT", "Database", "Management"] },
      { year: "2nd Year", code: "BSIT202", description: "Web Technologies", units: 3, tags: ["BSIT202", "BSIT", "Backend", "Web", "Technologies"] },
      { year: "2nd Year", code: "BSIT203", description: "Operating Systems", units: 3, tags: ["BSIT203", "BSIT", "Operating","Backend", "Systems"] },
      // 3rd Year BSIT Courses
      { year: "3rd Year", code: "BSIT301", description: "Networking", units: 3, tags: ["Backend"] },
      { year: "3rd Year", code: "BSIT302", description: "Software Engineering", units: 3, tags: ["Backend"] },
      { year: "3rd Year", code: "BSIT302", description: "Information Security", units: 3, tags: ["Backend"] },
      // 4th Year BSIT Courses
      { year: "4th Year", code: "BSIT401", description: "Project Management", units: 3, tags: [] },
      { year: "4th Year", code: "BSIT402", description: "Mobile Application Development", units: 3, tags: [] },
      { year: "4th Year", code: "BSIT403", description: "Internship/Thesis", units: 3, tags: [] },
    ]
  },

]

const preprocessData = (rawData) => {
  const processedData = [];
  rawData.forEach(programBlock => {
    const { program, courses } = programBlock;
    courses.forEach(course => {
      const processedCourse = {
        ...course,
        program, // Adding program from the programBlock
      };
      processedData.push(processedCourse);
    });
  });
  return processedData;
};

const insertData = async () => {
  const coursesToInsert = preprocessData(rawData);
  try {
    await Course.deleteMany({}); // Clears the collection before insertion, if needed
    await Course.insertMany(coursesToInsert);
    console.log('Courses inserted successfully.');
  } catch (error) {
    console.error('Error inserting courses:', error);
  }
};

insertData();