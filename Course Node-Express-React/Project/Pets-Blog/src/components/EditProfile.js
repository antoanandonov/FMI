import React, { Component } from 'react';
import User from './User'

export default class EditProfile extends Component {

    constructor(props){
        super(props);
        
        this.state = {
        }
    }

    render() {
        const { user, onEditProfile } = this.props;
        return (
            <div className="App margin-top-bottom">
                { <User key={user.userName} {...user} admin={this.props.user} onEditProfile={onEditProfile} /> }
            </div>
        );
    }
}