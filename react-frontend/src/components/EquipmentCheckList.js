import AddEquipment from "./AddEquipment";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup} from "react-bootstrap";

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
              <ListGroup.Item  variant="default" key={index} style={{ textAlign: 'left', color: "black", background: lgi.color }} as="li" >
                      {lgi.name}
                      
                      <form action="http://localhost:5000/removeEquipment" method="post">
                      
                      <Button variant="danger" className="float-end" type="submit" name="id" value={lgi.id}>remove</Button>

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