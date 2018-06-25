import React, { Component } from 'react';
import '../css/style.css';

class AddBlog extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        event.preventDefault();

        const newBlog = {
            title: this.titleInput.value,
            author: this.authorInput.value,
            content: this.contentInput.value,
            tags: this.tagsInput.value.split(',').map(tag => tag.trim()),
            url: this.urlInput.value,
            state: this.stateInput.value
        }

        this.props.onAdd(newBlog);

        this.titleInput.value ='';
        this.authorInput.value ='';
        this.contentInput.value ='';
        this.tagsInput.value ='';
        this.urlInput.value ='';
        this.stateInput.value ='active';
    }

    render() {
        return (
            <div className="container">
                <div className="margin-top-bottom">
                <h1>Add Blog</h1>
                </div>
                <hr/>
                <div className="container">
                    <form  onSubmit={this.onSubmit}> 
                        <div className="form-row">
                            <div className="col"><input className="shadow form-control form-control-lg" placeholder="Title" ref={titleInput => this.titleInput = titleInput}/></div>
                            <div className="col"><input className="shadow form-control form-control-lg" placeholder="Author" ref={authorInput => this.authorInput = authorInput}/></div>
                        </div>
                        <br/>
                        <input className="shadow form-control form-control-lg" placeholder="URL" ref={urlInput => this.urlInput = urlInput}/><br/>
                        <textarea className="shadow form-control form-control-lg height" type="text" ref={contentInput => this.contentInput = contentInput} name="content" placeholder="Content"/><br/>
                        
                        <div className="form-row">
                            <div className="col-4">
                                <select className="shadow form-control form-control-lg margin-left" ref={stateInput => this.stateInput = stateInput} name="state" defaultValue="active">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="col"><input className="shadow form-control form-control-lg margin-left" placeholder="Tags" ref={tagsInput => this.tagsInput = tagsInput}/></div><br/>
                        </div>
                        <br/>
                        <button className="btn btn-primary btn-lg btn-block">Add</button>
                        <hr/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBlog;
