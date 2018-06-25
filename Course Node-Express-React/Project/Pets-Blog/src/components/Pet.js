import React, { Component } from 'react';

export default class Pet extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            editMode: false
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
        const { id } = this.props;
        const newPet = {id: id, breed: this.breed.value, description: this.description.value}
        
        this.props.onEditPet(newPet);
        this.setState({editMode: false});
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
        const { breed, description } = this.props;
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="text-center">
                            <input className="shadow form-control-sm form-control" placeholder="Breed" defaultValue={breed} ref={breed => this.breed = breed}/>
                            
                        </div>
                        <textarea className="shadow form-control-sm form-control" placeholder="Breed" defaultValue={description} ref={description => this.description = description}/>
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
        const { breed, description } = this.props;
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="text-center">
                            <h5>{breed}</h5>
                            
                        </div>
                        <div className="text-justify">{description}</div>
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