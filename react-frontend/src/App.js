import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import ListPage from "./components/ListPage";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";
import LogOut from "./components/LogOut";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <Sidebar/>
        <Link className="navbar-brand" to={"/"}> <img src={logo} className="App-logo" alt="logo" /></Link>
        <Switch>
        <Route exact path ="/" component ={MainPage}/>
        <Route exact path="/UserPage" component ={LogOut}/>
        <Route  path="/UserPage/" component ={LogOut}/>

        </Switch>
          </div>
        </nav>
        <Switch>
              <Route exact path="/userPage" component={UserPage}/>
              <Route  path="/UserPage/" component ={ListPage}/>
            </Switch>
        
      </div>

    </Router>
    
  );
}

export default App;
