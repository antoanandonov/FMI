import React, { Component } from 'react';
import {  Link , BrowserRouter, Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './css/App.css';
import axios from 'axios';
import Error from './components/Error'
import Home from './components/Home'
import Blogs from './components/Blogs'
import AddBlog from './components/AddBlog'
// import $ from 'jquery';

// const data = require("./resources/blogs.json");
const host = 'http://localhost:3003';
const data = { "blogs": [
  {
  "id": null,
  "date": null,
  "title":null,
  "author":null,
  "content":null,
  "tags":[],
  "url": null,
  "state": null
}]};


localStorage.setItem('blogs', JSON.stringify(data.blogs));

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      blogs: JSON.parse(localStorage.getItem('blogs')),
      hasError: false,
      error: {},
      hasSucceeded : false,
      successMessage: ''
    }

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onCloseAlert = this.onCloseAlert.bind(this);
  }

  componentDidMount(){
    this.fetchBlogs();
}

getBlogs(){
  return this.state.blogs;
}

componentWillMount(){
  // this.fetchBlogs();
  const blogs = this.getBlogs();
  this.setState({blogs});
}

fetchBlogs = _ => {
  axios.get(`${host}/api/blogs`)
  .then(({ data: blogs }) => this.setState({blogs:blogs}))
  .catch(err => {
    this.setState({ hasError: true });
    this.setState({ error: err.response });
  })
}

onAdd = (blog) =>{
  axios.post(`${host}/api/blogs/add`, blog)
  .then(this.fetchBlogs)
  .then(() => {
    this.setState({ hasSucceeded: true });
    this.setState({ successMessage: `The Request with ID: ${this.state.blogs[this.state.blogs.length-1].id+1} was added successfully!` });
  })
  .catch(err => {
    this.setState({ hasError: true });
    this.setState({ error: err.response });
  })
}

onDelete(id){
  axios.delete(`${host}/api/blogs/` + id)
  .then(this.fetchBlogs)
  .then(() => {
    this.setState({ hasSucceeded: true });
    this.setState({ successMessage: `The Request with ID: ${id} has been deleted!` });
  })
  .catch(err => {
    this.setState({ hasError: true });
    this.setState({ error: err.response });
  })
}

onEditSubmit(id, blog, originalTitle){
  axios.patch(`${host}/api/blogs/` + id,  blog)
  .then(this.fetchBlogs)
  .then(() => {
    this.setState({ hasSucceeded: true });
    this.setState({ successMessage: `The Request with ID: ${id} has been edited!` });
  })
  .catch(err => {
    this.setState({ hasError: true });
    this.setState({ error: err.response });
  })
}

onCloseAlert(evt){
  evt.preventDefault();
  this.setState({ hasError: false, hasSucceeded: false });
}

  // onAdd(title, author, content, tags, url, state){
  //   const blogs = this.getBlogs();
  //   let id = (blogs.length -1) +1;
  //   let date = Date.now();
  //   blogs.push({
  //     id, date, title, author, content, tags, url, state
  //   });
  //   this.setState({blogs});
  // }

  // onDelete(title){
  //   const blogs = this.getBlogs();
  //   const filteredBlogs = blogs.filter(blog => {
  //     return blog.title !== title;
  //   });
  //   this.setState({blogs: filteredBlogs});
  // }

  // onEditSubmit(title, author, content, tags, url, state, originalTitle){
  //   let blogs = this.getBlogs();
  //   blogs = blogs.map(blog => {
  //     if(blog.title === originalTitle){
  //       blog.title = title;
  //       blog.date = Date.now();
  //       blog.author = author;
  //       blog.content = content;
  //       blog.tags = tags;
  //       blog.url = url;
  //       blog.state = state;
  //     }
  //     return blog;
  //   });
  //   this.setState({blogs});
  // }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand"><img src={logo} className="App-logo" alt="logo"/></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                  {/* <a class="nav-link"><Link className="nav-link" to="/"><h5 >Home</h5></Link></a> */}
                  <Link className="nav-link" to="/"><h5 >Home</h5></Link>
                  </li>
                  <li className="nav-item">
                  {/* <a class="nav-link"><Link className="nav-link" to="/blogs"><h5 >Blogs</h5></Link></a> */}
                  <Link className="nav-link" to="/blogs"><h5 >Blogs</h5></Link>
                  </li>
                  <li className="nav-item">
                  {/* <a class="nav-link"><Link className="nav-link" to="/add"><h5 >Add</h5></Link></a> */}
                  <Link className="nav-link" to="/blogs/add"><h5 >Create</h5></Link>
                  </li>
                </ul>
              </div>
              
              
            </nav>
            <div>
                {
                  this.state.hasError ? (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {window.scrollTo(0, 0)}
                      <strong>ERROR: {this.state.error.status} - {this.state.error.statusText}!</strong>
                      <br/>
                      <p>{this.state.error.data}</p>
                      <button onClick={this.onCloseAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ) : ( <div/> )
                }

                {
                  this.state.hasSucceeded ? (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      {window.scrollTo(0, 0)}
                      <strong>{this.state.successMessage}</strong>
                      <button onClick={this.onCloseAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ) : ( <div/> )
                }
              </div>
              <Switch>
                <Route exact path="/" render={ props => (<Home {...this.state}/>)}/>
                <Route exact path="/blogs/add" render={ props => (<AddBlog {...this.state} onAdd={this.onAdd}/>)}  />
                <Route path="/blogs" render={ props => (<Blogs {...this.state} onDelete={this.onDelete} onEditSubmit={this.onEditSubmit}/>)} />
                <Route component={Error} />
              </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
