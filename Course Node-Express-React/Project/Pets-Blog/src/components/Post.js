import React, { Component } from 'react';
import paws from '../resources/images/paws.png';

export default class Post extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            editMode: false
        }

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSave = (evt) => {
        evt.preventDefault();
        const {id, avatar,  added, onEditPost} = this.props;
        const post = {
            id: id,
            title: this.title.value,
            description: this.description.value,
            added: added, 
            edited: new Date(Date.now()).toLocaleString(),
            avatar: avatar
        }
        onEditPost(post);
        this.setState({ editMode: false });
    }

    onDelete = (evt) => {
        evt.preventDefault();
        const {id, onDeletePost} = this.props;
        onDeletePost(id);
    }

    onEdit = (evt) => {
        evt.preventDefault();
        this.setState({ editMode: true });
    }

    onCancel = (evt) => {
        evt.preventDefault();
        this.setState({ editMode: false });
    }

    editPost = () => {
        const { title, description, added, edited, userNameFK } = this.props;
       
        return (
            <div>
                <div className="card text-center">
                    <div className="card-header ">
                        <button type="submit" className="btn btn-sm btn-outline-success mb-2 float-right padding-button" onClick={this.onSave}>Save</button>
                        <button type="submit" className="btn btn-sm btn-outline-primary mb-2 float-right padding-button" onClick={this.onCancel}>Cancel</button>
                        <code className="card-title">{userNameFK}</code>
                    </div>
                    <div className="card-body">
                        <div className="form-row padding-bottom">
                            <div className="col"><input type="text" id="title" className="shadow form-control-lg form-control" defaultValue={title} ref={title => this.title = title}/></div>
                        </div>
                       
                        <textarea className="card-text text-justify shadow form-control-sm form-control height"  defaultValue={description.trim()} ref={description => this.description = description}/>
                    </div>
                    <div className="card-footer text-muted">Added on <p className="text-info">{new Date(added).toLocaleString()}</p>Edited on <p className="text-info">{new Date(edited).toLocaleString()}</p></div>
                </div>
            </div>
        )
    }

    getPost = () => {
        const { user, title, description, added, edited, userNameFK, avatar } = this.props;
        return (
            <div>
                <div className="card text-center">
                    <div className="card-header ">
                    
                        <code className="card-title">{userNameFK}</code>
                        <p className="card-title"><code className="text-info"> Added on {new Date(added).toLocaleString()}</code></p>
                        <div className="col">
                            { 
                                (user.userName === userNameFK) ? (
                                <div>
                                    <button type="submit" className="btn btn-sm btn-outline-primary mb-2 float-center padding-button" onClick={this.onEdit}>Edit</button>
                                    <button type="submit" className="btn btn-sm btn-outline-danger mb-2 float-center padding-button" onClick={this.onDelete}>Delete</button>
                                </div>
                                ) : (<div/>)
                            } 
                            </div>
                    </div>
                    <div className="card-body">
                        { (avatar) ? <img className="align-self-start mr-3 rounded-circle border shadow p-2 mb-5 bg-white rounded" src={avatar} alt="" width="200" height="200"/> : <img className="align-self-start mr-3 rounded-circle border shadow p-2 mb-5 bg-white rounded"  src={paws} alt="" width="200" height="200"/> }
                        
                        <div className="card-body">
                        <h5>{title}</h5> 
                        <pre className="card-text text-justify" ><p>{description}</p></pre>
                    </div>
                    </div>

                    <div className="card-footer text-muted">
                        <div className="row">
                             <div className="col">
                                <p><code className="text-info">Edited on {new Date(edited).toLocaleString()}</code></p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="App margin-top-bottom container">
                {
                   this.state.editMode ? ( this.editPost() ) : ( this.getPost() )
                }
            </div>
        );
    }
}