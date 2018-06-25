import React, { Component } from 'react';

// import unlockImg from '../resources/images/unlock.png';
// import signinImg from '../resources/images/signin.png';
import avatarImg from '../resources/images/avatar.png';

export default class Signin extends Component {
    constructor(props){
        super(props);
        this.onSignin = this.onSignin.bind(this);
    }

    onSignin = (event) =>{
        event.preventDefault();
        
        const user = {firstName: this.firstName.value, lastName: this.lastName.value, userName: this.userName.value, email: this.email.value, password: this.password.value};
        this.props.onSignin(user);

        this.firstName.value = '';
        this.lastName.value = '';
        this.userName.value = '';
        this.email.value = '';
        this.password.value = '';
      }


    render() {
        return (
            <div className="container">

                <form className="margin-top-bottom form shadow form-control-lg form-control">
                    <div className="padding-top">
                        <img className="mb-4" src={avatarImg} alt="" width="150" height="150"/>
                    </div>
                    
                    <div className="form-row padding-top-bottom">
                        <div className="col"><input type="text" id="firstName" className="shadow form-control-lg form-control" placeholder="First name" required="" ref={firstName => this.firstName = firstName}/></div>
                        <div className="col"><input type="text" id="lastName" className="shadow form-control-lg form-control" placeholder="Last name" required="" ref={lastName => this.lastName = lastName}/></div>
                    </div>
                    
                    <div className="form-row padding-bottom">
                        {/* <label for="email" className="sr-only">Email address</label> */}
                        <div className="col"><input type="text" id="userName" className="shadow form-control-lg form-control" placeholder="Username" ref={userName => this.userName = userName}/></div>
                    </div>

                    <div className="form-row padding-bottom">
                        {/* <label for="email" className="sr-only">Email address</label> */}
                        <div className="col"><input type="email" id="email" className="shadow form-control-lg form-control" placeholder="Email address" required="@" ref={email => this.email = email}/></div>
                    </div>
                    
                    <div className="form-row padding-bottom">
                        {/* <label for="password" className="sr-only">Password</label> */}
                        <div className="col"><input type="password" id="password" className="shadow form-control-lg form-control" placeholder="Password" required="" ref={password => this.password = password}/></div>
                    </div>

                    <div className="padding-top"><button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSignin}>Sign in</button></div>
                    
                    <p className="padding-bottom mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>

            </div>
        );
    }
}
