import AddList from "./addlist";
import React , { useState, useEffect }from "react";
import {Row,ListGroup} from "react-bootstrap";

export default function  UserPage()  {
  const [listgiInfo, setlistgiInfo] = useState([]);
  useEffect(() => {
      fetch('http://localhost:5000/getlists',{
          credentials: "include"
        })
          .then(response => response.json())
          .then(object => setlistgiInfo(object))
      },[]);
const ListGroupItem = (lgi, index) => {
  return (

<ListGroup.Item  variant="default"    key={index} style={{ textAlign: 'right', color: "white", background: lgi.color }} as="li" action href="#link1" >
{lgi.name}            
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
            
          {listgiInfo.map(ListGroupItem)}
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