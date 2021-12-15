import AddPlace from "./AddPlace";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup} from "react-bootstrap";
import {useParams} from "react-router-dom";
export default function  ListPage()  {
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
  let{ id } = useParams();
    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>{id}</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            
          {listInfo.map(ListGroupItem)}

        </ListGroup>
          </Row>
          <br />
          <Row>
         <AddPlace/>
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}
