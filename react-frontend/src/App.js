import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import ListPage from "./components/Pages/ListPage";
import MainPage from "./components/Pages/MainPage";
import UserPage from "./components/UserComponants/UserPage";
import LogOut from "./components/NavBarItems/LogOut";
import PlacePage from "./components/Pages/placepage";
import AdminPage from "./components/AdminComponants/AdminPage";
import techSupport from "./components/TechSupportComponant/TechSupport";
import ImageSliderAvtivate from "./components/Testing/ImageSliderActivate";
import UserFaq from "./components/UserComponants/UserFAQ";
import LoginErrorPage from "./components/Pages/LoginErrorPage";
import SignUpErrorPage from "./components/Pages/SignUpErrorPage";
import ForgotPasswordPage from "./components/UserComponants/ForgotPassword";
import JobListingsPage from "./components/Pages/JobListingsPage";
import JobPage from "./components/Pages/JobPage";

import "./App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <Link className="navbar-brand" to={"/"}> <img src={logo} className="App-logo" alt="logo" /></Link>
        <Switch>
        <Route exact path ="/" component ={MainPage}/>
        <Route  path="/UserPage" component ={LogOut}/>
        </Switch>
          </div>
        </nav>
       
        <Switch>
              <Route exact path="/" component={ImageSliderAvtivate}/>
              <Route exact path="/userPage" component={UserPage}/>
              <Route exact path="/UserPage/places/place" component ={PlacePage}/>
              <Route exact path="/UserPage/" component ={ListPage}/>
              <Route exact path="/UserPage/places" component ={ListPage}/>
              <Route exact path="/adminpage" component={AdminPage}/>
              <Route exact path="/techsupport" component={techSupport}/>
              <Route exact path="/FAQ" component={UserFaq}/>
              <Route exact path="/loginerror" component={LoginErrorPage}/>
              <Route exact path="/signuperror" component={SignUpErrorPage}/>
              <Route exact path="/jobs" component={JobListingsPage}/>
              <Route exact path="/jobs/job" component={JobPage}/>
              <Route exact path="/Forgotpassword" component={ForgotPasswordPage}/>
              </Switch>
      
      </div>
    </Router>
    
  );
}

export default App;
