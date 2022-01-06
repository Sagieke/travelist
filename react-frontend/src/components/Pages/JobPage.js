import React ,{ useState, useEffect }from "react";

//Requirement number 209
export default function  JobPage()  {
  
    const [jobData, setjobData] = useState('');

    useEffect(() => {
      fetch('http://localhost:5000/getJobInfo',{
        credentials: "include"
      })
      .then(response => response.json())
      .then(object => setjobData(object))
    },[]);

  return (
    
    <div className="auth-wrapper">
        <div className="auth-inner-center">
        <h1>{jobData.title}</h1>
        <hr></hr>
        <h3 style={{textAlign:"left"}}>Job description:</h3>
        <h4>{jobData.description}</h4>
        <div>
        <br></br>
        </div>
        <h3 style={{textAlign:"left"}}>requirements:</h3>
        <h4>{jobData.requirements}</h4>
        </div>
        
    </div>
    
  );
}
