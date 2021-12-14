import React from "react";
import {Button} from "react-bootstrap";
import {  Link } from "react-router-dom";

export default function LogOut(){
return(
 <div className="App-LogOut">
 <form action="http://localhost:5000/logout" method="post">
   <Button className="float-end" type="submit">LogOut</Button>
 </form>
 </div>
)
}