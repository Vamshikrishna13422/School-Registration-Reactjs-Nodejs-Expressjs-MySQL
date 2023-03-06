import React, { useEffect, useState} from "react";
import Header from "./Header";
import { useParams,useNavigate } from "react-router-dom";

const DetailsOfSchool = () => {
    let params= useParams();
    const navigate = useNavigate();
    const schoolId=params.sid;
    const [userId , setUserId] =useState("");
    const [schoolDetalis, SetSchoolDetails] = useState([]);
    const [schoolDetailsFound, SetSchoolDetailsFound] = useState(false);
    const [userAuth, setUserAuth] =useState();
    const [admissionResponse, setAdmissionResponse] =useState('')
    const token= localStorage.getItem("token");
  

 useEffect(() => {
  if(token !== null || undefined) {
    const options={
      method:"POST",
      headers:{ "content-Type":"application/json", 
      local_header_key: token,
      },
    };
   fetch("http://localhost:3089/user/auth/",options)
  .then((response) => response.json())
  .then((res) => {
    if(res.success === true){
      setUserAuth(res.success);
      setUserId(res.user[0].user_id);
    } else  {
      localStorage.removeItem('token');
      navigate('/login');
    }
  });
} else {
  navigate('/login');
}
  },[]);

  if(userAuth) {
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
      }

      function dateToYMD(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }
    
      
      const TakeAdmissionNow = () => {
        const AdmissionWithThisDetalis = {
            school_id: schoolId,
            user_id : userId,
            adimission_date : dateToYMD(new Date()),
        };

        const options={
            method:"Post",
            headers:{ "content-Type":"application/json" },
            body :JSON.stringify(AdmissionWithThisDetalis),
          };
          fetch("http://localhost:3089/admission/create/",options)
          .then((response) => response.json())
          .then((res) => {
          if(res.success === true)
          {
            setAdmissionResponse(res.message)
             
          }else {
            setAdmissionResponse(res.message)
          }
          });
      };
      return (
        <>
        <Header />
        <div className="container">
            {admissionResponse !== ''  ? ( 
            <>
            <div className="mt-2 p-1">{admissionResponse}</div> <button className="btn btn-primary btn-sm " onclick={() => {
              navigate("/myschools");
            }}
            > Check My Schools 
            </button>
            </>
             ) :(
                  "" 
                  )}
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
                  <button className="btn btn-primary" onclick={TakeAdmissionNow}
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
export default DetailsOfSchool;