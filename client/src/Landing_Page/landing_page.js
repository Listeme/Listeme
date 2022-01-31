import React, { Component }  from 'react';
import "./landing_page.css";

export default class LandingPage extends Component {

    render(){
        return(
            <div>
                <h1>Listeme</h1>
                <li className="login">Login</li>
                <li className="signup">Signup</li>
            </div>
        );
    };
        

}

