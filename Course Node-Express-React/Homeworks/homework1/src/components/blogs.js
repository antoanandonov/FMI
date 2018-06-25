import React from 'react';
import { Route, Link,  Switch } from "react-router-dom";
import Form from './form';
import Filter from './filter';
import Post from './post';
import EditForm from './edit-form';

export default class Blogs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            blogs: props.blogs
        };
    }

    componentDidMount(){
        this.getBlogs();
    }

    getBlogs = _ => {
        fetch('http://localhost:3003/blogs')
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            this.setState(res);
            console.log(this.props.blogs)
        })
        .catch(err => console.error(err))
    }

    renderBlogs = (blog) => {
        return (
            <li key={blog.id}>
                <button className="btn btn-primary" onClick={() => this.props.onDelete(blog)}>Delete</button>
                <Link to={`${this.props.match.url}/${blog.title}/edit`} ><button className="btn btn-primary" onClick={() => this.props.onEdit(blog)}>Edit</button></Link>
                <Link to={`${this.props.match.url}/${blog.title}`}>{blog.title}</Link>
            </li>
        );
    }

    render(){
        return(
            <div>
            <hr/>
            <div className="row no-gutters">
              <div /* className="col-6 col-md-4"*/>
              <nav className="Topics-nav">
                  <ul> 
                      { this.state.blogs.map(this.renderBlogs)}
                  </ul>
              </nav>
              </div>
              
            </div>
            <Switch>
              <Route path="/newblog" component={Form} />
              <Route path="/filter" component={Filter} />
              <Route exact path={`${this.props.match.url}/:title`} render={({ match }) => {
                  return (
                      <div>
                        <Post blogs={this.state.blogs} blogToEdit={this.state.blogToEdit}  post={this.state.blogs.find(t => t.title === match.params.title)} onDelete={this.props.onDelete} onEdit={this.props.onEdit}/>
                      </div>
                  );
              }} />
               <Route exact path={`${this.props.match.url}/:title/edit`} render={({ match, props }) => {
                  return (
                      <div>
                        <EditForm {...props} blogToEdit={this.state.blogs.find(t => t.title === match.params.title)} onEdit={this.props.onEdit}/>
                      </div>
                  );
              }} />
               </Switch>
          </div>
        )
    }

}