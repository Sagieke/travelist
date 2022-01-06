import React , { useState, useEffect}from "react";
import {ListGroup, Row,Accordion,AccordionButton} from "react-bootstrap";

const listStyle={
    textAlign: 'left',
    color: "black",
    background: "white" 
    }

    //Requirement number 209
export default function JobListingsPage()  {
    const [ShowJoblist, setJobList] = useState([]);

     useEffect(() => {
        fetch('http://localhost:5000/getJobs',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setJobList(object))
        },[]);

        
    //Requirement number 209
    const JobsListItem = (lji, index) => {
      return (
        <ListGroup.Item  variant="default" key={index} style={listStyle} as="li">
            {lji.title}
            <form action="http://localhost:5000/viewJob" method="post">
            <button className="float-end" type="submit" name="id" value={lji.id}>view list</button>
            </form>
        </ListGroup.Item>
        )   
  };
 return (
     
<div className="auth-wrapper">
        <div className="auth-inner-center">
            <h1>We are hiring for:</h1>
            <Row>
                <ListGroup defaultActiveKey="#link1" as="ol" numbered>
                    {ShowJoblist.map(JobsListItem)}
                </ListGroup>
            </Row>
            </div>
            </div>
       
        
   ); 
 }
