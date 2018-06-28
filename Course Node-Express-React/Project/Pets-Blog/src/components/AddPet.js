import React, { Component } from 'react';
import {  NavLink } from "react-router-dom";

export default class AddPet extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            editMode: false
        }

        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }


    onAdd = (evt) => {
        evt.preventDefault();
        const newPet = { breed: this.breed.value, description: this.description.value }
        
        this.props.onAddPet(newPet);
    }

    onCancel = (evt) => {
        evt.preventDefault();
        this.setState({editMode: false});
    }

    addPet = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="form-row padding-top-bottom">
                            <input type="text" id="breed" className="shadow form-control-lg form-control" placeholder="Breed" ref={breed => this.breed = breed}/>
                            {/* <input className="shadow form-control-sm form-control" placeholder="Breed"  /> */}
                        </div>
                        <div className="form-row padding-bottom">
                            <textarea className="card-text text-justify shadow form-control-lg form-control minHeight" placeholder="Description" ref={description => this.description = description}/>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <button type="submit" className="btn btn-lg btn-success mb-2 float-right padding-button" onClick={this.onAdd}>Add</button>
                        <NavLink to="/profile/pets" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button">Cancel</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div className="App margin-top-bottom">
               { this.addPet() }
            </div>
        );
    }
}