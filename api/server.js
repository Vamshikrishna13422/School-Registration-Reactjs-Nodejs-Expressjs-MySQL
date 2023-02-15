const express=require("express");

const dotenv=require("dotenv");
dotenv.config();

const schoolcontroller = require("./controller/schoolscontroller");
const admissioncontroller = require("./controller/admissioncontroller");
const usercontroller = require("./controller/userscontroller");

var school=express();
school.listen(process.env.PORT, () => {
    console.log("Hey Im Working At 3089");
});
school.use(express.json()); 
school.use("/school/",schoolcontroller); 
school.use("/admission/",admissioncontroller);  
school.use("/user/",usercontroller); 