import React from "react";
import {Button} from "react-bootstrap";
import ChangePassword from "../UserComponants/changepassword";
import UserHelp from "../UserComponants/UserHelp";
import BackButton from "./BackButton";
import UserMesseges from "../UserComponants/UserMessege";
import UserAdminMesseges from "../UserComponants/UserAdminMassege";
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
 <BackButton/>
 <ChangePassword/>
 <UserHelp/>
 <UserMesseges/>
 <UserAdminMesseges/>
 
 </div>
 </div>
 )
}













