import React, { Component } from 'react';

export default class Users extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            editMode: false
        }
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onSave = (evt) => {
        evt.preventDefault();
        const {id, userName, email, isAdmin, onEditProfile} = this.props;
        const user = {
            id: id,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            userName: userName,
            password: this.password.value,
            email: email,
            isAdmin: isAdmin
        }
        onEditProfile(user);
        this.setState({ editMode: false });
    }

    onEdit = (evt) => {
        evt.preventDefault();
        this.setState({ editMode: true });
    }

    onCancel = (evt) => {
        evt.preventDefault();
        this.setState({ editMode: false });
    }

    getUser = () => {
        const { firstName, lastName, userName, email, isAdmin } = this.props;
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="text-center">
                            <h3>{firstName} {lastName}</h3>
                        </div>
                        <div className="text-justify">Username: <samp className="text-secondary">{userName}</samp></div>
                        <div className="text-justify">Password: ****</div>
                        <div className="text-justify">Email: <samp className="text-primary">{email}</samp></div>
                        <div className="text-justify">isAdmin: <samp>{ isAdmin === 'true' ? (<span className="badge badge-pill badge-success">{isAdmin}</span>) : (<span className="badge badge-pill badge-danger">{isAdmin}</span>) }</samp></div>

                    </li>
                    <li className="list-group-item">
                        <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button" onClick={this.onEdit}>Edit</button>
                    </li>
                </ul>
            </div>
        );
    }

    editUser = () => {
        const { firstName, lastName, userName, email, isAdmin } = this.props;
        return (
            <div className="padding-top-bottom shadow-lg container">
            <form>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="form-row padding-top-bottom">
                            <div className="col"><input type="text" id="firstName" className="shadow form-control-lg form-control" placeholder="First name" defaultValue={firstName} ref={firstName => this.firstName = firstName}/></div>
                            <div className="col"><input type="text" id="lastName" className="shadow form-control-lg form-control" placeholder="Last name" defaultValue={lastName} ref={lastName => this.lastName = lastName}/></div>
                        </div>
                        <div className="form-row padding-bottom">
                            <div className="col"><input type="password" id="password" className="shadow form-control-lg form-control" placeholder="Password" ref={password => this.password = password}/></div>
                        </div>
                        <div className="text-justify">Username: <samp className="text-secondary">{userName}</samp></div>
                        <div className="text-justify">Email: <samp className="text-primary">{email}</samp></div>
                        <div className="text-justify">isAdmin: <samp>{ isAdmin === 'true' ? (<span className="badge badge-pill badge-success">{isAdmin}</span>) : (<span className="badge badge-pill badge-danger">{isAdmin}</span>) }</samp></div>

                    </li>
                    <li className="list-group-item">
                        <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button" onClick={this.onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-lg btn-outline-success mb-2 float-right padding-button" onClick={this.onSave}>Update</button>
                    </li>
                </ul>
            </form>
            </div>
        );
    }

    render() {
        return (
            <div className="App padding-top-bottom">
                { this.state.editMode ? ( this.editUser() ) : ( this.getUser() ) }
            </div>
        );
    }
}