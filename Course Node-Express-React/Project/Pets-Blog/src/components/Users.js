import React, { Component } from 'react';
import User from './User'

export default class Users extends Component {

    constructor(props){
        super(props);
        
        this.state = {
        }
    }

    componentWillMount(){
        this.props.loadUsers();
    }

    render() {
        const { users, onEditProfile } = this.props;
        return (
            <div className="App margin-top-bottom container">
                {
                    users.map(user => {
                        return (<User key={user.userName} {...user} onEditProfile={onEditProfile} />);
                    })
                }
            </div>
        );
    }
}