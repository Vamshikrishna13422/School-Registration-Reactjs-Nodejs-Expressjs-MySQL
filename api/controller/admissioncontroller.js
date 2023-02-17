const express = require("express");

const db = require("../config/dbConfig");

var router = express.Router();

// file upload code
var multer=require("multer")
var myLocalStorage= multer.diskStorage({
  destination:function(req,file,callback)
  {
    callback(null,"./images");
  },
  filename:function(req,file,callback)
  {
    callback(null,file.originalname);
  },
});
var upload=multer({ storage:myLocalStorage });

router.get("/", (req, res) => {
    try {
      res.json({
        success: true,
        message: "Simple Admission Call",
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }); 
// create Admission
router.post("/create/", (req, res) => {
    try {
      const admission_id = Math.floor(10000 * Math.random() + 99999);
      const school_id= req.body.school_id;
      const user_id= req.body.user_id;
      const adimission_date= req.body.adimission_date;
      const admission_status = req.body.admission_status;
      const admission_del = req.body.admission_del ;
  
      var sql = `INSERT INTO school_admission (admission_id,school_id,user_id,admission_date,status,isDeleted) 
      VALUES
    ('${admission_id}','${school_id}','${user_id}','${adimission_date}','${admission_status}','${admission_del}')`;
  
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
            message: "Admission  Created Success",
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
// update admission
router.put("/update/",(req,res) => {
    try{
      const admission_id = req.body.admission_id;
      const school_id= req.body.school_id;
      const user_id= req.body.user_id;
      const adimission_date= req.body.adimission_date;
      const admission_status = req.body.admission_status;
      const admission_del = req.body.admission_del ;
      //checking the Existing
      var checkExisting = `SELECT * FROM school_admission WHERE admission_id ='${admission_id}'`;
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
              message:"Admission ID Not Found! Not Updated"
            });
          }
          else{
            var updateData = `UPDATE school_admission SET  
            school_id='${school_id}',
            user_id='${user_id}',
            admission_date='${adimission_date}',
            status='${admission_status}',
            isDeleted='${admission_del}' WHERE  admission_id ='${ admission_id }'`;
  
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
          
      }  catch(error){
    res.json({
      sucess:false,
      error,
    });
   }
  });

// delete
router.delete("/delete/:admissionid",(req,res) => {
    try{
     const admissionid=req.params.admissionid;
      //checking the Existing
      var checkExisting = `SELECT * FROM school_admission WHERE admission_id='${admissionid}'`;
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
            message:"admission  Id Not Found! Not Updated",
          });
        }else {
          var deleteOne= `DELETE FROM school_admission WHERE admission_id='${admissionid}'`;
          db.query(deleteOne,(error,results) => {
            if(error){
              res.json({
                sucess:false,
                message:"Admission Is Not Deleted",
                error,
              });
            } else {
              res.json({
                sucess:true,
                message:"admission Is Deleted Success",
              });
            }
          });
        } 
      }
    });
   } catch (error) {
    res.json({
      success: false,
      message:"catch Error",
      error,
    });
  }
  });

// admission By ID
router.get("/:admissionid",(req,res) =>{
  try{
    const admissionid=req.params.admissionid;
    var checkExisting = `SELECT * FROM school_admission WHERE admission_id='${admissionid}'`;
    db.query(checkExisting,(error,results) =>{
      if(error){
        res.json ({
          success:false,
           error,
        });
      } else {
        if(results.length === 0){
          res.json({
            sucess:false,
            message:"Admission Id Not Found",
          });
      }else {
        res.json({
          sucess:true,
          message:"Admission Id  Is Found",
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

// Get Admission Detalis By ID
router.get("/info/:admid",(req,res) => { 
   try{
    const admid=req.params.admid;
    var checkExisting = `SELECT * FROM school_admission WHERE admission_id='${admid}'`;
    db.query(checkExisting,(error,admissionResults) =>{
      if(error){
        res.json({
          success:false,
          error,
        });
      }else{
        if(admissionResults.length === 0){
          res.json({
            success:false,
            message:"Admission ID Not Found",
          });
        } else{
          const userId=admissionResults[0].user_id;
          const schoolId=admissionResults[0].school_id;
          
          var getUserDetailsById= `SELECT * FROM users WHERE user_id='${userId}'`;
          db.query(getUserDetailsById,(error,userDetalis) => {
            if(error) {
              res.json({
                sucess:false,
                message:"User Details Not Found",
              });
            }else{
              var getSchoolBySchoolId =`SELECT * FROM schools_list WHERE school_id='${schoolId}'`;
              db.query(getSchoolBySchoolId, (error,schoolDetails) => {
                if(error){
                  res.json({
                    success:false,
                    message:"School Details Not Found",
                  });
                } else {
                  res.json({
                    success:true,
                    admissionResults,
                    userDetalis,
                    schoolDetails,
                  });
                }
              });
            }
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

// Upload An Image
router.post("/upload/",upload.single('myImage'),(req,res) =>                                                                                                                   {
  try{
    res.json({
      success:true,
      message:"File Uploaded Success",
    });
  } catch(error) {
    res.json({
      success:false,
      error,
    });
  }
});

module.exports = router;