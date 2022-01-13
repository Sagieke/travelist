import React from "react";

//requirement number 2 + 102 + 202
export default function LoginErrorPage()  {

    return(
        <div className="auth-wrapper">
            <div className="auth-inner-center">
            <h1>Wrong Email or password, try again.</h1>
            <form action='http://localhost:5000/login' method='post' >
            <div className="form-group">
                <label>Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>
        
        <button type="submit" className="btn btn-primary btn-block" >
                log in
              </button>
              <div>or</div>
        <form action="http://localhost:3000/signup">
        <button 
          type="submit" className="btn btn-primary btn-block" >
          sign-up
        </button>
        </form>
        <a href="http://localhost:3000/forgotPassword" >forgot pass</a>
        </form>
            </div>
        </div>
        
    );
}