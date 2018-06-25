import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import signinImg from '../resources/images/signin.png';
// import unlockImg from '../resources/images/unlock.png';
import lockImg from '../resources/images/lock.png';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin = (event) =>{
        event.preventDefault();
        
        const user = {userNameOrEmail: this.userNameOrEmail.value, password: this.password.value};
        this.props.onLogin(user);

        this.userNameOrEmail.value = '';
        this.password.value = '';
    }

    render() {
        return (
            <div className="container">

                <form className="margin-top-bottom form-signin shadow form-control-lg form-control">
                    <div className="padding-top-bottom ">
                        <img className="mb-4" src={lockImg} alt="" width="150" height="150"/>
                    </div>
                    
                    <div className="form-row padding-bottom">
                        <div className="col">
                            <label htmlFor="userNameOrEmail" className="sr-only">Username or Email</label>
                            <input type="email" id="userNameOrEmail" className="shadow form-control-lg form-control" placeholder="Username or Email" required="" ref={userNameOrEmail => this.userNameOrEmail = userNameOrEmail}/>
                        </div>
                    </div>

                    <div className="form-row padding-bottom">    
                        <div className="col">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" id="password" className="shadow form-control-lg form-control" placeholder="Password" required="" ref={password => this.password = password}/>
                        </div>
                    </div>

                    <div className="form-row padding-bottom checkbox mb-3">
                        <div className="col">
                            <label><input type="checkbox" value="remember-me"/> Remember me</label>
                        </div>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onLogin}>Login</button>
                    <Link className="nav-link" to="/signin"><h5 >Sign in</h5></Link>

                    <p className="padding-bottom mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
                
            </div>
        );
    }
}
