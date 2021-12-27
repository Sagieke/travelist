import React from "react";
import {Button} from "react-bootstrap";
import ChangePassword from "./changepassword"
export default function LogOut(){
return(
<div className="container">
<div className="App-LogOut"> 
 
 <form action="http://localhost:5000/logout" method="post">
 <Button className="float-end" type="submit">LogOut</Button>
 </form>
 <ChangePassword/>
 </div></div>
 )
}













