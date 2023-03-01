import React from "react";
import { useNavigate } from "react-router-dom";


const SchoolsList = (props) => { 
    const{ schoolsList } =props;
    const navigate = useNavigate();

    const navigateForSchool = sid => {
      navigate(`/school/${sid}`);
    }


const listview =schoolsList.map((school, i) => {
    return(
    <div className="col-md-6 p-2 mb-2" key={i}>
  <div className="border border-primary rounded p-3 shadow-sm">
    <h3>{school.school_name}</h3>
    <p>{school.school_description}</p>
    <hr />
    <div className="row">
      <div className="col text-left">
        <b>
        {school.adimission_date} | {school.school_fee}
        </b>
      </div>
      <div className="col text-right">
      <button className="btn btn-primary"onclick={() => navigateForSchool(school.school_id)}>Take Admission</button>
      </div>
    </div>
  </div>
  </div>
  
  )
})
    return(
      <>
    {listview}
    </>
)
}
export default SchoolsList;