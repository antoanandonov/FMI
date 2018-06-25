import React, { Component } from 'react';

export default class AddPet extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            editMode: false
        }

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }


    onSave = (evt) => {
        evt.preventDefault();
        const newPet = { breed: this.breed.value, description: this.description.value }
        
        this.props.onAddPet(newPet);

    }

    onCancel = (evt) => {
        evt.preventDefault();
    }

    addPet = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="text-center">
                            <input className="shadow form-control-sm form-control" placeholder="Breed"  ref={breed => this.breed = breed}/>
                            
                        </div>
                        <textarea className="shadow form-control-sm form-control" placeholder="Breed"  ref={description => this.description = description}/>
                    </li>
                    <li className="list-group-item">
                        <button type="submit" className="btn btn-lg btn-success mb-2 float-right padding-button" onClick={this.onSave}>Save</button>
                        <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button" onClick={this.onCancel}>Cancel</button>
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