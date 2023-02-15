const express = require("express");

const db = require("../config/dbConfig");

var router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Simple school Call",
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
    const school_id = Math.floor(10000 * Math.random() + 99999);
    const school_name	 = req.body.school_name;
    const school_fee= req.body.school_fee;
    const adimission_date= req.body.adimission_date;
    const school_description = req.body.school_description;
    const school_status = req.body.school_status;
    const school_del = req.body.school_del;

    var sql = `INSERT INTO schools_list (school_id,school_name,school_fee,adimission_date,school_description,status,isDeleted) 
    VALUES
    ('${school_id}','${school_name	}','${school_fee}','${adimission_date}','${school_description}','${school_status}','${school_del}')`;

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
          message: "school Created Success",
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
    const school_id = req.body.school_id;
    const school_name	 = req.body.school_name;
    const school_fee= req.body.school_fee;
    const adimission_date= req.body.adimission_date;
    const school_description = req.body.school_description;
    const school_status = req.body.school_status;
    const school_del = req.body.school_del;
    
    //checking the Existing
    var checkExisting = `SELECT * FROM schools_list WHERE school_id='${school_id}'`;
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
            message:"School ID Not Found! Not Updated"
          });
        }
        else{
          var updateData = `UPDATE schools_list SET  
          school_name='${school_name}',
          school_fee='${school_fee}',
          adimission_date='${adimission_date}',
          school_description='${school_description}',
          status='${school_status}',
          isDeleted='${school_del}' WHERE school_id='${school_id}'`;

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
//DELETE
router.delete("/delete/:schoolid",(req,res) => {
  try{
    const schoolid=req.params.schoolid;
    //checking the Existing
    var checkExisting = `SELECT * FROM schools_list WHERE school_id='${schoolid}'`;
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
          message:"School Id Not Found! Not Updated",
        });
      }else {
        var deleteOne= `DELETE FROM schools_list WHERE school_id='${schoolid}'`;
        db.query(deleteOne,(error,results) => {
          if(error){
            res.json({
              sucess:false,
              message:"School Is Not Deleted",
              error,
            });
          } else {
            res.json({
              sucess:true,
              message:"School Is Deleted Success",
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

//event By ID
router.get("/:schoolid",(req,res) => {
  try{
    const schoolid=req.params.schoolid;
    var checkExisting = `SELECT * FROM schools_list WHERE school_id='${schoolid}'`;
    db.query(checkExisting,(error,results) =>{
      if(error){
        res.json ({
          success:false,
           error,
        });
      } else {
        if(results.length === 0) {
          res.json({
            sucess:false,
            message:"School Id Not Found",
          });
      }else {
         res.json({
          sucess:true,
          message:"School Id  Is Found", 
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

//Get List Of schools
router.get("/i/list/",(req,res) => {
  try{
    var Schools = `SELECT *FROM schools_list`;
    db.query(Schools, (error,results) => {
      if(error) {
        res.json({
          success:false,
          error,
        });
      } else { 
        if( results.length === 0) { 
          res.json({
            success:false,
            message:"No Schools",
          });
        } else {
          res.json({
            success:true,
            results,
          });
        }
      }
    });
  } catch (error) {
    res.json({
      sucess:false,
      error,
    });
  }
}); 

module.exports = router; 