import AddList from "./addlist";
import React, {useState, useEffect}from "react";
import {Row,ListGroup} from "react-bootstrap";


export default function  UserPage()  {
  const [allValues, setAllValues] = useState({
    color: '',
    name: '',
 });

  useEffect(() => {
    fetch('http://localhost:5000/getlists')
    .then(response => response.json())  
    .then(data => setAllValues.color(data.color))
    .then(data => setAllValues.name(data.name))
  },[])
  const ListGroupItem = (lgi, index) => {
    return (

<ListGroup.Item  variant="default"    key={index} style={{ textAlign: 'right', color: "white", background: lgi.color }} as="li" action href="#link1" >
 {lgi.title}            
</ListGroup.Item>


    )

     
  };




    return (
    
       
      <div className="auth-wrapper">  
          <Row>
        <div className="auth-inner-left">
          <h1>my lists</h1>
          <hr class="my-4"></hr>
          <Row>
          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
          {ListGroupItem.map(allValues)}
        </ListGroup>
          </Row>
          <br />
          <Row>
         <AddList/>
          </Row>
          </div>
          <br />
          <div className="auth-inner-right">
          <h1>most search places</h1>
          <hr class="my-4"></hr>
          
          </div>
          </Row>
        </div>
        
    );
    
}


