const express=require('express');
const db=require("./config/dbconfig.js");
var school=express();
school.listen(3000, () => {
    console.log("Hey Im Working At 3000");
});

const users=[
    {
        id:1,
        name:"vamshi",
        email:"vam@gmail.com",
    },
    {
        id:2,
        name:"kumar",
        email:"kum@gmail.com",
    
    },
];
school.get("/",(req,res)=>{
    res.json({
    status:true,
    message:"Yes im calling now!",
    });
});
school.get("/user/:userid",(req,res) =>{
    res.json({
        status:true,
        mylocaldata,
    })
})
school.get("/user/:userid",(req,res)=>{
    var userid=req.params.userid
    const finduser=users.filter((a)=>a.id==userid);
    if(finduser.length==0)
    {
        res.json({
            sucess:false,
            message:"user not found!",
        });
    }
     else
    {
        res.json({
        sucess:true,
        data:finduser,
        
    });
}
});




