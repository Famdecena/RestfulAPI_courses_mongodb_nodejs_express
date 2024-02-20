const mongoose = require('mongoose');
const Course = require('./models/Course'); // Ensure this path matches your file structure

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
    year: "1st Year",
    courses: [
      {
        code: "BSIS101",
        description: "Introduction to Information Systems",
        units: 3,
        tags: ["BSIS101", "BSIS", "Information Systems", "Introduction"]
      },
      {
        code: "BSIS102",
        description: "Fundamentals of Programming",
        units: 3,
        tags: ["BSIS102", "BSIS", "Programming", "Fundamentals"]
      },
      {
        code : "BSIS103",
        description: "Database Management Systems",
        units: 3,
        tags: ["BSIS103", "BSIS", "Database", "Management", "Systems"]
      }
    ],
    program: "BSIS",
    year: "2nd Year",
    courses: [
      {
        code: "BSIS201",
        description: "Systems Analysis and Design",
        units: 3,
        tags: ["BSIS201", "BSIS", "Systems", "Analysis", "Design"]
      },
      {
        code: "BSIS202",
        description: "Object-Oriented Programming",
        units: 3,
        tags: ["BSIS202", "BSIS", "Object-Oriented", "Programming"]
      },
      {
        code: "BSIS203",
        description: "Data Structures and Algorithms",
        units: 3,
        tags: ["BSIS203", "BSIS", "Data", "Structures", "Algorithms"]
      }
    ],
    program: "BSIS",
    year: "3rd Year",
    courses: [
      {
        code: "BSIS301",
        description: "Web Development",
        units: 3,
        tags: ["BSIS301", "BSIS", "Web", "Development"]
      },
      {
        code: "BSIS302",
        description: "Software Engineering",
        units: 3,
        tags: ["BSIS302", "BSIS", "Software", "Engineering"]
      },
      {
        code: "BSIS303",
        description: "Information Security",
        units: 3,
        tags: ["BSIS303", "BSIS", "Information", "Security"]
      }
    ],
    program: "BSIS",
    year: "4th Year",
    courses: [
      {
        code: "BSIS401",
        description: "Enterprise Systems",
        units: 3,
        tags: ["BSIS401", "BSIS", "Enterprise", "Systems"]
      },
      {
        code: "BSIS402",
        description: "Project Management",
        units: 3,
        tags: ["BSIS402", "BSIS", "Project", "Management"]
      },
      {
        code: "BSIS403",
        description: "Internship/Thesis",
        units: 6,
        tags: ["BSIS403", "BSIS", "Internship", "Thesis"]
      }
    ]
  },
  {
    program: "BSIT",
    year: "1st Year",
    courses: [
      {
        code: "BSIT101",
        description: "Introduction to Information Technology",
        units: 3,
        tags: ["BSIT101", "BSIT", "Information Technology", "Introduction"]
      },
      {
        code: "BSIT102",
        description: "Programming Fundamentals",
        units: 3,
        tags: ["BSIT102", "BSIT", "Programming", "Fundamentals"]
      },
      {
        code: "BSIT103",
        description: "Computer Organization and Architecture",
        units: 3,
        tags: ["BSIT103", "BSIT", "Computer", "Organization", "Architecture"]
      }
    ],
    program: "BSIT",
    year: "2nd Year",
    courses: [
      {
        code: "BSIT201",
        description: "Database Management",
        units: 3,
        tags: ["BSIT201", "BSIT", "Database", "Management"]
      },
      {
        code: "BSIT202",
        description: "Web Technologies",
        units: 3,
        tags: ["BSIT202", "BSIT", "Web", "Technologies"]
      },
      {
        code: "BSIT203",
        description: "Operating Systems",
        units: 3,
        tags: ["BSIT203", "BSIT", "Operating", "Systems"]
      }
    ],
    program: "BSIT",
    year: "3rd Year", 
    courses: [
      {
        code: "BSIT301",
        description: "Networking",
        units: 3,
        tags: []
      },
      {
        code: "BSIT302",
        description: "Software Engineering",
        units: 3,
        tags: []
      },
      {
        code: "BSIT303",
        description: "Information Security",
        units: 3,
        tags: []
      }
    ],
    program: "BSIT",
    year: "4th Year",
    courses: [
      {
        code: "BSIT401",
        description: "Project Management",
        units: 3,
        tags: []
      },
      {
        code: "BSIT402",
        description: "Mobile Application Development",
        units: 3,
        tags: []
      },
      {
        code: "BSIT403",
        description: "Internship/Thesis",
        units: 6,
        tags: []
      }
    ]
  }
];
const preprocessData = (rawData) => {
  const processedData = [];
  rawData.forEach(programBlock => {
    const program = programBlock.program;
    Object.entries(programBlock).forEach(([key, value]) => {
      if (key !== 'program') {
        const year = key;
        value.forEach(course => {
          processedData.push({ ...course, year, program });
        });
      }
    });
  });
  return processedData;
};

const insertData = async () => {
  const coursesToInsert = preprocessData(rawData);
  try {
    await Course.deleteMany({}); // Optional: Clear the collection before insertion
    await Course.insertMany(coursesToInsert);
    console.log('All courses have been successfully inserted.');
  } catch (error) {
    console.error('Failed to insert courses:', error);
  }
};

insertData();
