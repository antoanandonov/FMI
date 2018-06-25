import React from "react";

export default class EditForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id : props.blogToEdit.id,
            date : props.blogToEdit.date,
            title : props.blogToEdit.title ? props.blogToEdit.title : '',
            author : props.blogToEdit.author ? props.blogToEdit.author : '',
            content : props.blogToEdit.content ? props.blogToEdit.content : '',
            tags : props.blogToEdit.tags ? props.blogToEdit.tags : '',
            url : props.blogToEdit.url ? props.blogToEdit.url : '',
            state : props.blogToEdit.state
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.change = this.change.bind(this);
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        let blog = {
            id: this.state.id,
            date: Date.now(),
            title: this.refs.title.value,
            author: this.refs.author.value,
            content: this.refs.content.value,
            tags: this.refs.tags.value,
            url: this.refs.url.value,
            state: this.refs.state.value
        }
        this.props.onEdit(blog);

        this.refs.title.value = '';
        this.refs.author.value = '';
        this.refs.content.value = '';
        this.refs.tags.value = '';
        this.refs.url.value = '';
        this.refs.state.value = 'active';
      }
        
    render(){

        return (
            <div className="row">
            <hr/>
            <form onSubmit={this.handleSubmit}>
                <label>Title:
                    <input type="text" ref="title" name="title" placeholder="Title" value={this.state.title} onChange={this.change}/>
                </label>
                
                <br/>

                <label>Author:
                    <input type="text" ref="author" name="author" placeholder="Author" value={this.state.author} onChange={this.change}/>
                </label>

                <br/>

                <label>Content:
                    <textarea type="text" ref="content" name="content" placeholder="Content" value={this.state.content} onChange={this.change}/>
                </label>

                <br/>

                <label>Tags:
                    <input type="text" ref="tags" name="tags" placeholder="Tags" value={this.state.tags} onChange={this.change}/>
                </label>

                <br/>

                <label>URL:
                    <input type="text" ref="url" name="url" placeholder="URL" value={this.state.url} onChange={this.change}/>
                </label>

                <br/>

                <label>State:
                    <select ref="state" name="state" value={this.state.state} onChange={this.change}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </label>

                <br/>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )

    }
}