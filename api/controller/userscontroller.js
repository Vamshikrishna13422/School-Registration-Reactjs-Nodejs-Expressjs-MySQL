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
      const status = req.body.status
      const isDel = req.body.isDel

      var sql = `INSERT INTO users (user_id,user_name,user_rollnumber,user_mobile,user_password,status,isDeleted) 
      VALUES
      ('${user_id}','${user_name}','${user_roll}','${user_mob}','${user_pass}','${status}','${isDel}')`;
  
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
router.put("/update/", (req,res) => {
  try {
    const userid= req.body.userid;
    const username= req.body.username;
    const userroll= req.body.userroll;
    const usermob= req.body. usermob;
    const userpass= req.body.userpass;
    const userstatus=req.body.userstatus;
    const userdel=req.body.userdel;

    let tokenHeader= process.env.TOKEN_HEADER_KEY;
    let tokenSecrete= process.env.JWT_SECRET_KEY;

    // validate The Token
    const token=req.header(tokenHeader);
    const verified=req.verify(token,tokenSecrete);
    if(verified)
    {
      // Checking The Existing
      var checkExisting= `SELECT * FROM users WHERE user_id='${userid}'`;
      db.query(checkExisting, (error,results) => {
        if(error) {
          res.json({
            success:false,
            error,
          });
        } else {
          if(results.length != 0) {
            //update data
            var updateData= `UPDATE users SET user_name='${username}',
            user_rollnumber='${userroll}',user_mobile='${usermob}',
            user_password='${userpass}',status='${ userstatus}',isDeleted='${userdel}' WHERE user_id='${userid}'`;

            db.query(updateData,(error,results) => {
              if(error)
              {
                res.json({
                  success:false,
                  error,
                });
              } else{
                res.json({
                  success:true,
                  message:"Data Updated Sucess",
                  results,
                });
              }
            });
          } else {
            res.json({
              success:false,
              message:"User ID Not Found! Not Updated",
            });
          }  
        }
      });
    } else {
      res.json({
        sucess:false,
        message:"User Not Have Access to Update The Data",
      });
    }
  } catch(error) {
    res.json({
      success:false,
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

    var checkUserInDb = `SELECT * FROM users WHERE user_rollnumber='${username}'`;
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

//search User 
router.get("/s/search/",(req,res) => {
  try{
    const searchQuery=req.query.text;
    var searchQueryDb=`SELECT * FROM users WHERE user_name LIKE '%${searchQuery}%'`;
    db.query(searchQueryDb,(error,results) => {
      if(error) {
        res.json({
          success:false,
          error,
        });
      } else{
        if(results.length != 0) {
          res.status(200).json({
            success:true,
            searchResults:results,           
          });
        } else{
          res.status(404).json ({
            message:"Search Related Information Not Found!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success:false,
      error,
    });
  }
});


module.exports = router;