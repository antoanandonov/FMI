import React, { Component } from 'react';
import Pet from './Pet'
// import AddPet from './AddPet'
import axios from 'axios';

const KEY = 'a94b9a5c6d4843ad501987eb920fcc5f7bcc0ceaee5ca8a5a24938ced9e56c46';

export default class Pets extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            image: "",
            load: this.props.load
        }

        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount(){
        const { loadPets, loadPetsByUser} = this.props;
        switch(this.state.load){
            case 'allPets':
                loadPets();
            break;
            case 'petsByUser':
                loadPetsByUser();
            break;
            default:
            break;
        }
        
    }

    onAdd = (evt) => {
        evt.preventDefault();
        // <Redirect to="/pets/add"/>

        return (
            <div>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    getPetImage = (pet) => {
        const breed = pet.breed.replace(/\s/g, "%20");
        console.log("breed", breed)
        axios.get(`https://api.unsplash.com/search/photos?client_id=${KEY}&page=1&query=` + breed, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
            }).then( ({ data: d }) => {
                const url = d.results[0].urls.full;
                this.setState({ image: url });
            })
            .catch(err => {
            console.log(err);
            });
    }

    getPet = (pet) => {
        const id = pet.id;
        return (
            <div key={`pet${id}`} className="card">
                <div className="card-header" id={`pet${id}`}>
                <h5 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={`#pet${id}`} aria-expanded="false" aria-controls={`pet${id}`}>
                    {pet.breed}
                    </button>
                </h5>
                </div>
                <div id={`pet${id}`} className="collapse show" aria-labelledby={`pet${id}`} data-parent="#accordion">
                <div className="card-body">
                    {pet.description}
                </div>
                </div>
            </div>
        )
    }

    render() {
        const { pets, onEditPet, onDeletePet } = this.props;
        return (
            <div className="App margin-top-bottom">
                <div className="margin container">
                <button type="button" className="btn btn-lg btn-success mb-2 float-center padding-button" onClick={this.onAdd}>Add Pet</button>
                    { 
                        pets.map(pet => {
                            return (<Pet key={pet.id} {...pet} onEditPet={onEditPet} onDeletePet={onDeletePet}/> );
                        })
                    }
                </div>
            </div>
        );
    }
}