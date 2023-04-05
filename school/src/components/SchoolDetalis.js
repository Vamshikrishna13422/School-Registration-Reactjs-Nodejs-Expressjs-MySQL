import React, { useEffect, useState} from "react";
import Header from "./Header";
import { useParams,useNavigate } from "react-router-dom";

const SchoolDetalis = () => {
    let params= useParams();
    const navigate = useNavigate();
    const schoolId=params.sid;
    const [schoolDetalis, SetSchoolDetails] = useState("");
    const [schoolDetailsFound, SetSchoolDetailsFound] = useState(false);
    
    useEffect(() => {
        const options= { 
          method:"GET",
        };
       fetch(`http://localhost:3089/school/${schoolId}`,options)
      .then((response) => response.json())
      .then((res) => {
        if(res.success === true) {
            SetSchoolDetails(res.results);
            SetSchoolDetailsFound(res.success);
        } else {
            SetSchoolDetailsFound(res.success);
         }
          });
      },[]); 
      return (
        <>
        <Header />
        <div className="container">
             {schoolDetailsFound ? (
        <>
        <div className="row ">
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>{schoolDetalis[0].school_name}</h3>
               <p>{schoolDetalis[0].school_description}</p> 
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>{schoolDetalis[0].adimission_date} | {schoolDetalis[0].school_fee} </b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary" onclick={() => {
                    navigate('/login');
                    }}
                    >
                        Take Admission
                        </button>
                </div>
              </div>
            </div>
          </div>
          </div>
          </>
          ) : (
         "School ID Not Found" 
          )}
          </div>
          </>
           );

          }
export default SchoolDetalis;