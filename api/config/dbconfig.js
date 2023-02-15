const mysql=require("mysql");

const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"local_schools",
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