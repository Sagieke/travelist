import AddEquipment from "./AddEquipment";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Form} from "react-bootstrap";

<Form>
  {['checkbox', 'radio'].map((type) => (
    <div key={`default-${type}`} className="mb-3">
      <Form.Check 
        type={type}
        id={`default-${type}`}
        label={`default ${type}`}
      />

      <Form.Check
        disabled
        type={type}
        label={`disabled ${type}`}
        id={`disabled-default-${type}`}
      />
    </div>
  ))}
</Form>



export default function EquipmentChecklist()  {
  const [checklistInfo, setchecklistInfo] = useState([]);

  
  useEffect(() => {
      fetch('http://localhost:5000/getEquipmentChecklist',{
          credentials: "include"
        })
          .then(response => response.json())
          .then(object => setchecklistInfo(object))
      },[]);


  const ListGroupItem = (lgi, index) => {
      return (
              <ListGroup.Item  variant="default" key={index} style={{ textAlign: 'left', color: "black", background:"lightblue" }} as="li" >
                      {lgi.name}
                      
                      <form action="http://localhost:5000/removeEquipment" method="POST">
                      
                      <Button variant="danger" className="float-end" type="submit" name="id" value={lgi.id}>remove</Button>
                       <form action="http://localhost:5000/checkEquipment" method="POST">
                         <Button name="id" value={lgi.id}  type="submit"  style={{backgroundColor:lgi.color,color:"black"}}>Check as done.</Button>
                         </form>
                      </form>
              </ListGroup.Item>
             )   
  };
  

    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>Equipment checklist</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
          {checklistInfo.map(ListGroupItem)}
        </ListGroup>
          </Row>
          <br />
          <Row>
         <AddEquipment/>
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}