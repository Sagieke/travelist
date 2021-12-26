import React from "react";
import { Button } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import { useState,useEffect } from "react";
export default function UserList(){
    
 const [listInfo, setlistInfo] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getUserlist',{
            credentials: "include"
          })
            .then(response => response.json())
            .then(object => setlistInfo(object))
        },[]);
  
  
    const ListGroupItem = (lgi, index) => {
  
        return (
                <ListGroup.Item  variant="default" key={index} style={{ textAlign: 'left', color: "black", background: "#1ca0f9" }} as="li" >
                        {lgi.name} {lgi.start_date} - {lgi.end_date}
                        
                        <form action="http://localhost:5000/removeplace" method="post">
                        
                        <Button variant="danger" className="float-end" type="submit" name="id" value={lgi.id}>remove</Button>
                        
                        </form>
                        <form action="http://localhost:5000/viewplace" method="post">
                        <Button variant="success" className="float-end" type="submit" name="id" value={lgi.id}>view place</Button>
                       </form>
                </ListGroup.Item>
               )   
    };
 };

