import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Accordion,} from "react-bootstrap";
import { FaQuestionCircle } from 'react-icons/fa';
import AddFAQ from "../AddingComponants/AddFaq";
import Faq from "../NavBarItems/FAQ";
import EditFAQ from "../Pages/EditFAQ";




const DeleteButtonStyle={
  flexDirection:'row',
  alignItems:'center',
  borderColor:"black",
  backgroundColor:"red",
  color:"black",
  width:"100px",
  height: '30px'
}


const ButtonStyle2={
    color:"black",
    height:"50px",
    borderColor:"black",
    backgroundColor:"Lightgreen",
    margin:"10px",
    width:"200px",
    height:"50px",
    
  }

 
const DropDownButtonStyle={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"black",
  color:"white",
}
const EditFaqStyleButton={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"grey",
  color:"black",
}

const DeleteFaqStyleButton={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"red",
  color:"black",
}
const TableStyle={
  overflow: "Auto"
}




export default function UserFaq()  {
    const [ShowFaqlist, setFaqList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getFAQ',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setFaqList(object))
        },[]);
    const ListFAQ = (lfq) => {

      return (
        <div className="auth-inner-FAQ2">
        <Accordion style={{overflow:"Auto"}} defaultActiveKey="0" flush>
       <Accordion.Item>
        <Accordion.Header>{lfq.question}</Accordion.Header>
        <Accordion.Body>{lfq.answer}</Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </div>
             )   
  };
 return (
   
  <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-FAQ">
          <h1>FAQ'S:</h1>
          <hr class="my-4"></hr>
          <Row style={{'height': '298px', 'overflow':'auto'}}>

          
          {ShowFaqlist.map(ListFAQ)}
         
        
          </Row>
          <br />
          <Row>
           
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}