import React, { Component } from 'react';

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
        const {id,  added, onEditPost} = this.props;
        const post = {
            id: id,
            title: this.title.value,
            description: this.description.value,
            added: added, 
            edited: new Date(Date.now()).toLocaleString(),
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
                        <textarea className="card-text text-justify shadow form-control-sm form-control height"  defaultValue={description} ref={description => this.description = description}/>
                    </div>
                    <div className="card-footer text-muted">Added on {new Date(added).toLocaleString()}; Edited on {new Date(edited).toLocaleString()}</div>
                </div>
            </div>
        )
    }

    getPost = () => {
        const { user, title, description, added, edited, userNameFK } = this.props;
        return (
            <div>
                <div className="card text-center">
                    <div className="card-header ">
                        { 
                            (user.userName === userNameFK) ? (
                            <div>
                                <button type="submit" className="btn btn-sm btn-outline-danger mb-2 float-right padding-button" onClick={this.onDelete}>Delete</button>
                                <button type="submit" className="btn btn-sm btn-outline-primary mb-2 float-right padding-button" onClick={this.onEdit}>Edit</button>
                            </div>
                            ) : (<div/>)
                         } 
                        
                        <code className="card-title">{userNameFK}</code>
                    </div>
                    <div className="card-body">
                        <h5>{title}</h5> 
                        <pre className="card-text text-justify"><p>{description}</p></pre>
                    </div>
                    <div className="card-footer text-muted">Added on {new Date(added).toLocaleString()}; Edited on {new Date(edited).toLocaleString()}</div>
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