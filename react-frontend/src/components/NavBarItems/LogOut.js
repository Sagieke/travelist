import React from "react";
import {Button} from "react-bootstrap";
import ChangePassword from "../UserComponants/changepassword";
import UserHelp from "../UserComponants/UserHelp";
const ButtonStyle1={
    width:"80px",
    borderColor:"black",
    color:"black",
    height:"35px",
   borderColor:"black",
    backgroundColor:"lightgrey",
    margin:"1px",
  }
export default function LogOut(){
return(
<div className="container">
<div className="App-LogOut"> 
 <form action="http://localhost:5000/logout" method="post">
 <Button style={ButtonStyle1}className="float-end" type="submit">LogOut</Button>
 </form>
 <ChangePassword/>
 </div>
 </div>
 )
}













