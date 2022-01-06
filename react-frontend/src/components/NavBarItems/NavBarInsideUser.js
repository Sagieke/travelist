import React, {useEffect,useState}from "react";
import { Button, Navbar, Nav, NavDropdown,Container} from 'react-bootstrap';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { FaHandsHelping } from 'react-icons/fa';
import {VscQuestion} from 'react-icons/vsc';
import {AiFillBug} from 'react-icons/ai';
import {TiMessages} from 'react-icons/ti';
import {RiLockPasswordLine} from 'react-icons/ri';








export default function InsideUserNavbar()
{
    const[userType1,setUserType]=useState("")
  useEffect(() => {
    fetch('http://localhost:5000/getCertainUserlist',{
        credentials: "include"
     })
      .then(response => response.json())
       .then(object => setUserType(object))
    },[]);

    function UserType()
    {
      if(userType1==="Admin"){

        return <Nav.Link href="/adminpage"> Admin page </Nav.Link>
      }
     else if(userType1==="TechSupport"){
         return <Nav.Link href="/techsupport"> TechSupport page </Nav.Link>
       }
     else{
       return null
     }

    }
  return (
 
    <div>
     <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/UserPage">TraveList</Navbar.Brand>
    <Nav className="me-auto">
    <UserType/>
    <Nav.Link href="/faq"> FAQ <VscQuestion/> </Nav.Link>
    <Nav.Link href="/jobs"> Work for us <MdOutlineWorkOutline/></Nav.Link>
    <Nav.Link href="/aboutus"> About us<GiBrain/> </Nav.Link>
    <Nav.Link href="/UserAdminMessege"> Admin updates <AiOutlineGlobal/></Nav.Link>
    <NavDropdown bg="dark" variant="dark" title="Help" id="collasible-nav-dropdown">
    <NavDropdown.Item href="/changePassword"><RiLockPasswordLine/>Change my password</NavDropdown.Item>
    <NavDropdown.Item href="/Usermesseges"><TiMessages/>My support tickets </NavDropdown.Item>
    <NavDropdown.Item href="/SubmitBugUser"><AiFillBug/> Submit a bug</NavDropdown.Item>
    <NavDropdown.Item href="/Suggestions"><FaHandsHelping />Submit a suggestion</NavDropdown.Item>
      </NavDropdown>
    <form action="http://localhost:5000/logout" method="post">
    <Button className="NavBar-Button" type="submit">LogOut</Button>
    </form>
    </Nav>
    </Container>
    </Navbar>
    </div>
    );
}