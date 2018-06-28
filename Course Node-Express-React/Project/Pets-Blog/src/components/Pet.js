import React, { Component } from 'react';
import paws from '../resources/images/paws.png';

export default class Pet extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            editMode: false,
            pet: {breed: this.props.breed, description: this.props.description, avatar: this.props.avatar}
        }

        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    onEdit = (evt) => {
        evt.preventDefault();
        this.setState({editMode: true});
    }

    onSave = (evt) => {
        evt.preventDefault();
        const { id, avatar } = this.props;
        const newPet = {id: id, breed: this.breed.value, description: this.description.value, avatar: avatar}
        
        this.props.onEditPet(newPet);
        this.setState({editMode: false, pet:newPet});
    }

    onCancel = (evt) => {
        evt.preventDefault();
        this.setState({editMode: false});
    }

    onDelete = (evt) => {
        evt.preventDefault();
        const { id } = this.props;
        this.props.onDeletePet(id);
    }

    editPet = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="text-center">
                            <input className="shadow form-control-lg form-control" placeholder="Breed" defaultValue={this.state.pet.breed} ref={breed => this.breed = breed}/>
                            
                        </div>
                        <textarea className="shadow form-control-lg form-control minHeight" placeholder="Breed" defaultValue={this.state.pet.description} ref={description => this.description = description}/>
                    </li>
                    <li className="list-group-item">
                        <button type="submit" className="btn btn-lg btn-success mb-2 float-right padding-button" onClick={this.onSave}>Save</button>
                        <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button" onClick={this.onCancel}>Cancel</button>
                    </li>
                </ul>
            </div>
        );
    }

    getPet = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="media">
                            { (this.state.pet.avatar) ? <img className="align-self-start mr-3 rounded-circle border shadow p-2 mb-5 bg-white rounded" src={this.state.pet.avatar} alt="" width="200" height="200"/> : <img className="align-self-start mr-3 rounded-circle border shadow p-2 mb-5 bg-white rounded" src={paws} alt="" width="200" height="200"/> }
                            <div className="media-body margin-left">
                                <h5 className="mt-0 text-center">{this.state.pet.breed}</h5>
                                <p className="text-justify">{this.state.pet.description}</p>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <button type="submit" className="btn btn-lg btn-outline-danger mb-2 float-right padding-button" onClick={this.onDelete}>Delete</button>
                        <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right padding-button" onClick={this.onEdit}>Edit</button>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div className="App margin-top-bottom">
                { this.state.editMode ? ( this.editPet() ) : ( this.getPet() ) }
            </div>
        );
    }

}