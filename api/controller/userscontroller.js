const express = require("express");

const db = require("../config/dbConfig");

const jwt=require("jsonwebtoken");

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
//update user [auth]
router.put("/update/",(req,res) => {
  try{ 
    const userid = req.body.userid;
    const user_name= req.body.user_name;
    const user_roll= req.body.user_roll;
    const user_mob= req.body.user_mob;
    const user_pass = req.body.user_pass;
  
    let tokenHeader= process.env.TOKEN_HEADER_KEY;
    let tokensecrete=process.env.JWT_SECRET_KEY;
     // validate the token
     const token=req.header(tokenHeader);
     const verified=req.verify(token, tokensecrete);
     if(verified)
    {
     //checking the Existing
   var checkExisting = `SELECT * FROM users WHERE user_id='${userid}'`;
   db.query(checkExisting,(error,results) =>{
    if(error) {
      res.json({
        success:false,
        error, 
      });
    }
    else{
      if (results.length === 0)
      {
        res.json({
          success:false,
          message:"User ID Not Found! Not Updated"
        });
      }
      else{
      var updateData = `UPDATE users  SET  
        user_name='${user_name}',
        user_rollnumber='${user_roll}',
        user_mobile='${user_mob}',
        user_password='${user_pass}' WHERE user_id='${userid}'`;
  
        db.query( updateData,(error,results) => {
          if(error)
          {
            res.json ({
              success:false,
              error,
            });
          }
          else{
            res.status(200).json({
              success:true,
              message:"Data Updated Sucess",
              results,
            });
          }  
        });
      }
    }
   });
     } 
     else {
     res.status(401).json({
     success:false,
      message:"User Not Have Access to Update The Data", 
       });
  } 
 } catch(error){
    res.json({
      sucess:false,
      message:"Error in catch",
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

//user By ID
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
router.get("/i/list",(req,res) => {
    try{
      var listOne = `SELECT * FROM users`;
      db.query(listOne,(error,results) => {
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

//user login
router.post("/login/",(req,res) => {
  try{
    const username=req.body.username;
    const password=req.body.password;

    var checkUserInDb=`SELECT * FROM users WHERE user_rollnumber='${username}'`;
    db.query(checkUserInDb,(error,results) => {
      if(error){
        res.json({
          sucess:false,
          error,
        });
      } else {
        if(results.length != 0){
          const dbpassword=results[0].user_password;
          const userid=results[0].user_id;
          if(dbpassword == password) {
            let jwtSecretKey=process.env.JWT_SECRET_KEY;
            let sessionData= {
              time:Date(),
              username: username,
              userid: userid,
            };
          const token = jwt.sign(sessionData,jwtSecretKey,{
            expiresIn:process.env.JWT_TOKEN_EXPIRES });
            res.json({
              success:true,
              message:"Login Sucess",
              token: token,
            });
      
          } else{ 
            res.json({
              sucess:false,
              message:"Wrong Password!,Try Again"
            });
           }
        } else {
          res.json({
            success:false, 
            message:"User Not Registered,Try Again",
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