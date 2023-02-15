const express = require("express");

const db = require("../config/dbConfig");

var router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Simple User Call",
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
}); 

//create
router.post("/create/", (req, res) => {
    try {
      const user_id = Math.floor(1000 * Math.random() + 9999);
      const user_name= req.body.user_name;
      const user_roll= req.body.user_roll;
      const user_mob= req.body.user_mob;
      const user_pass = req.body.user_pass;

      var sql = `INSERT INTO users (user_id,user_name,user_rollnumber,user_mobile,user_password) 
      VALUES
      ('${user_id}','${user_name}','${user_roll}','${user_mob}','${user_pass}')`;
  
      db.query(sql, (err, results) => {
        if (err) {
          res.json({
            success: false,
            message: "Data Not inserted",
            err,
          });
        } else {
          res.json({
            success: true,
            message: "User Created Success",
            results,
          });
        }
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  });
//update
router.put("/update/",(req,res) => {
    try{
        const user_id = req.body.user_id;
        const user_name= req.body.user_name;
        const user_roll= req.body.user_roll;
        const user_mob= req.body.user_mob;
        const user_pass = req.body.user_pass;
      
      //checking the Existing
      var checkExisting = `SELECT * FROM users WHERE user_id='${user_id}'`;
      db.query(checkExisting,(error,results) =>{
        if(error){
          res.json({
            success:false,
            error,
          });
        }
        else{
          if(results.length === 0)
          {
            res.json({
              sucess:false,
              message:"User ID Not Found! Not Updated"
            });
          }
          else{
            var updateData = `UPDATE users  SET  
            user_name='${user_name}',
            user_rollnumber='${user_roll}',
            user_mobile='${user_mob}',
            user_password='${user_pass}' WHERE user_id='${user_id}'`;
  
            db.query( updateData,(error,results) => {
              if(error)
              {
                res.json ({
                  sucess:false,
                  error,
                });
              }
              else{
                res.json({
                  sucess:true,
                  message:"Data Updated Sucess",
                  results,
                });
              }
            });
          }
        }
      });
   }   
   catch(error){
    res.json({
      sucess:false,
      error,
    });
   }
  });  
//delete
router.delete("/delete/:userid",(req,res) => {
    try{
      const userid=req.params.userid;
      //checking the Existing
      var checkExisting = `SELECT * FROM users  WHERE user_id='${userid}'`;
      db.query(checkExisting,(error,results) => {
        if(error){
          res.json ({
            success:false,
             error,
          });
        }
      else {
        if(results.length === 0){
          res.json({
            sucess:false,
            message:"user Id Not Found! Not Updated",
          });
        }else {
          var deleteOne= `DELETE FROM users WHERE user_id='${userid}'`;
          db.query(deleteOne,(error,results) => {
            if(error){
              res.json({
                sucess:false,
                message:"User Is Not Deleted",
                error,
              });
            } else {
              res.json({
                sucess:true,
                message:"User Is Deleted Success",
              });
            }
          });
        } 
      }
    });
   } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
  });  

//event By ID
router.get("/:userid",(req,res) =>{
    try{
        const userid=req.params.userid;
      var checkExisting = `SELECT * FROM users WHERE user_id='${userid}'`;
      db.query(checkExisting, (error,results) =>{
        if(error){
          res.json ({
            success:false,
             error,
          });
        } else {
          if(results.length === 0){
            res.json({
              sucess:false,
              message:"User Id Not Found",
            });
        }else {
          res.json({
            sucess:true,
            message:"User Id  Is Found",
            results,
          });
        }
      }
      });
    }catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  });  

//Get List Of Users
router.get("/list/",(req,res)=> {
    try{
      var listOne = `SELECT * FROM users`;
      db.query(listOne,(error,results) =>{
        if(error)
        {
          res.json({
            success:false,
            error,
          });
        } else
        {
          if(results.length === 0)
          {
            res.json({
              success:false,
              message:"No users",
            });
          }else {
            res.json({
              success:true,
              results,
            });
          }
        }
      });
    } catch(error){
      res.json({
        sucess:false,
        error,
      });
    }
  });  

module.exports = router;