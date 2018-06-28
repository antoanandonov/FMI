import React, { Component } from 'react';
import {  Link , BrowserRouter, Route, Switch } from "react-router-dom";
import EditProfile from './EditProfile'
import Calculator from './Calculator'
import AddPet from './AddPet'
import Pets from './Pets'

export default class Profile extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            image: "",
            // user: this.props.user,
            pets: this.props.petsByUser

        }
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = (evt) => {
        evt.preventDefault();
        const { onLogout } = this.props;
        onLogout();
    }

    render() {
        const { user, onEditProfile, loadPetsByUser, onEditPet, onDeletePet, onAddPet } = this.props;
        return (
            <div className="App  margin-top-bottom">
                <h1>Hello, {user.firstName} {user.lastName}!</h1>
                <BrowserRouter>
                <div className="container margin-top-bottom">
                
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile/edit"><h5>Profile</h5></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile/pets"><h5>My Pets</h5></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile/calculate"><h5>Calculator</h5></Link>
                        </li>
                        <li className="nav-item">
                            <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button" onClick={this.onLogout}>Logout</button>
                        </li>
                    </ul>
                    
                    <Switch>
                        <Route path="/profile/edit" render={ () => (<EditProfile {...this.state} user={user} onEditProfile={onEditProfile}/>)}/>
                        <Route path="/profile/pets" render={ () => (<Pets {...this.state} loadPetsByUser={loadPetsByUser} pets={this.props.petsByUser} onEditPet={onEditPet} onDeletePet={onDeletePet} onAddPet={onAddPet} load='petsByUser'/>)}/>
                        <Route path="/profile/calculate" render={ () => (<Calculator {...this.state} />)}/>
                        <Route path="/pets/add" render={ () => (<AddPet {...this.state} onAddPet={onAddPet}/>)}/>
                    </Switch>
                    
                </div>
                </BrowserRouter>   
            </div>
        );
    }
}