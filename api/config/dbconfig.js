const mysql=require("mysql");

const jwt=require("jsonwebtoken");

const dotenv=require("dotenv");
dotenv.config();

const conn=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
conn.connect((error)=>{
    if(error){
        console.log("connection Failed");
    }
    else{
        console.log("connection Sucess");
    }
});
module.exports=conn;