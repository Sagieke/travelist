import AddPlace from "../AddingComponants/AddPlace";
import Weather from "./weather";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup} from "react-bootstrap";

export default function  ListPage()  {
  const [listInfo, setlistInfo] = useState([]);
  const [listdata, setlistdata] = useState([]);
  var [latlon, setlatlon] = useState('');

  useEffect(() => {
      fetch('http://localhost:5000/getplaces',{
          credentials: "include"
        })
          .then(response => response.json())
          .then(object => setlistInfo(object))
      },[]);
     
  useEffect(() => {
      fetch('http://localhost:5000/getListInfo',{
         credentials: "include"
        })
         .then(response => response.json())
         .then(object => setlistdata(object))
      },[]);


    
        
  

  const ListGroupItem = (lgi, index) => {
 
      return ( 
              <ListGroup.Item  variant="default" key={index} style={{ textAlign: 'left', color: "black", background: "#1ca0f9" }} as="li">
                <div className="auth-inner-place"><Row><Col><h6>place name</h6></Col><Col><h5>start date</h5></Col><Col><h5>end date</h5></Col></Row>
                <Row><Col>{lgi.name}</Col><Col> {lgi.start_date}</Col><Col>{lgi.end_date}</Col></Row></div>
                  
                      <form action="http://localhost:5000/removeplace" method="post">
                      
                      <Button variant="danger" className="float-end" type="submit" name="place_id" value={lgi.id}>remove</Button>
                      {console.log("gggg")}
                      </form>
                     
                      <form action="http://localhost:5000/viewplace" method="post">
                      
                      <Button variant="success" className="float-end" type="submit" name="place_id" value={lgi.id}>view place</Button>
                     </form>

                   
              </ListGroup.Item>
             )   
  };
  

    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>{listdata.name}</h1>
          <hr class="my-4"></hr>
          <Row style={{'height': '298px', 'overflow':'auto'}}>

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