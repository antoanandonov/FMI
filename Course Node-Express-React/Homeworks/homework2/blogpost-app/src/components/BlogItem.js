import React, { Component } from 'react';
import '../css/style.css';

class BlogItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEdit: false
        }

        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onEdit(){
        this.setState({ isEdit: true});
    }

    onCancel(){
        this.setState({ isEdit: false});
    }

    onDelete(){
        const {onDelete, id} = this.props;
        onDelete(id);
    }

    onEditSubmit(event){
        event.preventDefault();
        const {onEditSubmit, id} = this.props;
        const blog = {
            title: this.titleInput.value,
            author: this.authorInput.value,
            content: this.contentInput.value,
            tags: this.tagsInput.value.split(',').map(tag => tag.trim()),
            url: this.urlInput.value,
            state: this.stateInput.value
        }
        onEditSubmit(id, blog, this.props.title);
        this.setState({ isEdit: false});
    }

    onChange = e => {
        e.preventDefault();
        alert("name: "+ e.target.name + " value: " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { date, title, author, content, tags, url, state } = this.props;
        return (
            <div>
                {
                    this.state.isEdit ? (
                        <div className="padding-top-bottom shadow-lg container">
                        <form>
                            <div className="form-row">
                                <div className="col"><input className="shadow form-control-sm form-control" placeholder="title" defaultValue={title} ref={titleInput => this.titleInput = titleInput}/></div>
                                <div className="col"><input className="shadow form-control-sm form-control" placeholder="author" defaultValue={author} ref={authorInput => this.authorInput = authorInput}/></div>
                            </div>
                            <br/>
                            <textarea className="shadow form-control form-control-sm height" type="text" ref={contentInput => this.contentInput = contentInput} name="content" placeholder="Content" defaultValue={content} onChange={this.change}/><br/>
                            <input className="shadow form-control form-control-sm" placeholder="url" defaultValue={url} ref={urlInput => this.urlInput = urlInput}/><br/>
                            <div className="form-row">    
                                    <div className="col-4">
                                        <select className="shadow form-control form-control-sm margin-left" ref={stateInput => this.stateInput = stateInput} name="state" defaultValue={state} onChange={this.change}>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="col"><input className="shadow form-control form-control-sm" placeholder="tags" defaultValue={tags} ref={tagsInput => this.tagsInput = tagsInput}/><br/></div>
                            </div>
                            <br/>
                            <button className="btn btn-primary" onClick={this.onEditSubmit}>Save</button>
                            <button className="btn btn-secondary margin-left" onClick={this.onCancel}>Cancel</button>
                        </form>
                        </div>
                    ) : (
                        <div className="shadow-lg container">
                            <div className="col-form-label col-form-label-lg"><h1 className="font-weight-bold lead col-form-label col-form-label-lg margin-left" >{title}</h1></div>
                            <div className="col-form-label col-form-label-sm" >{ state === 'active' ? <font className="badge badge-pill badge-success" color="green">{state}</font> : <font className="badge badge-pill badge-danger" color="red">{state}</font> }</div>
                            
                            <div className="col-form-label col-form-label-sm">
                                <p>{new Date(date).toUTCString()}</p>
                                <code>{tags.toString().split(',').map(tag => tag.replace(" ", "_")).map(tag => `#${tag.trim()} `)}</code>
                            </div>
                            {/* <div className="col-form-label col-form-label-sm"><code>{tags}</code></div> */}
                            <div className="margin-left-right col-form-label text-justify"> <samp>{content}</samp></div>
                            <div className="col-form-label"><a href={url} target="_blank">{url}</a></div>
                            
                            <div className="col-form-label col-form-label-lg"><p className="blockquote-footer">{author}</p></div>
                            <div className="padding-bottom">
                                <button type="button" className='btn btn-outline-primary' onClick={this.onEdit}>Edit</button>
                                <button type="button" className='btn btn-outline-danger  margin-left' onClick={this.onDelete}>Delete</button>
                            </div>
                        </div>
                    )
                }
                <br/>
            </div>
            
        );
    }
}

export default BlogItem;
