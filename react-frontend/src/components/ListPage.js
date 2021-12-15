import AddList from "./addlist";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup} from "react-bootstrap";

export default function  UserPage()  {
  const [listInfo, setlistInfo] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/getplaces',{
          credentials: "include"
        })
          .then(response => response.json())
          .then(object => setlistInfo(object))
      },[]);


  const ListGroupItem = (lgi, index) => {
      return (
              <ListGroup.Item  variant="default" key={index} style={{ textAlign: 'left', color: "white", background: lgi.color }} as="li" >
                      {lgi.name}
                      {lgi.start_date}
                      <form action="http://localhost:5000/removeplace" method="post">
                      <Button className="float-end" type="submit" name="id" value={lgi.id}>remove</Button>
                      </form>
              </ListGroup.Item>
             )   
  };

    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>{listInfo.list_name}</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            
          {listInfo.map(ListGroupItem)}

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