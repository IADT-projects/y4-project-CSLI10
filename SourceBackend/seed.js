const courseList = require('./data/list_courses.json').golf_courses
require('dotenv').config();
require('./utils/db.js')();
const Course = require('./models/course_schema');


Course.insertMany(courseList)
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
});

