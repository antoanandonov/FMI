import React, { } from 'react';
import './index.css';
import './app.css';
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Home from './home';
import Filter from './components/filter';
import Blogs from './components/blogs';
import Error from './components/error';
import Form from './components/form';

var data = require("./resources/blogs.json"); 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      blogToEdit: {
        id : "",
        date : "",
        title : "",
        author : "",
        content : "",
        tags : "",
        url : "",
        state : "active"
      },      
        fields: data.blogs,
        blogs: {
          id : "",
          date : "",
          title : "",
          author : "",
          content : "",
          tags : "",
          url : "",
          state : "active"
        },
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onFilter = this.onFilter.bind(this);
  };

  onSubmit = fields => {
    this.setState({fields : this.state.fields.concat(fields)});
  }

  onDelete = blog => {
      let index = this.state.fields.indexOf(blog);
      let deleted = this.state.fields.splice(index, 1);
      console.log("Deleted: " + deleted);
      this.setState({fields : this.state.fields});
  }

  onEdit = blog => {
    // let index = this.state.fields.indexOf(blog);
    let edited = this.state.fields.splice(blog.id, 1, blog);
    console.log("Edited: " + edited);
    this.setState({fields : this.state.fields});
  }

  onFilter = state => {
    console.log(state);
    this.setState({fields : this.state.fields.filter(f => f.state === state)});
  }

  render() {
    return (
      <div className="container">
      <div className="text-center">
      <Link to="/home"><h1>Hello World;</h1></Link>
      <h5 className="text-center">This is a simple blogger!</h5>
      <hr/>
      <div className="row">
        <Link to="/blogs"><h5 >Blogs</h5></Link>
        <Link to="/filter"><h5 >Filter</h5></Link>
        <Link to="/form"><h5 >Create</h5></Link>
      </div>
      {/* <div>{JSON.stringify(this.state.fields)}</div> */}
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect from="/home" to="/" />
      <Route path="/blogs" render={ props => (<Blogs {...props} blogs={this.state.fields} onDelete={this.onDelete} onEdit={this.onEdit}/>)} />
      <Route path="/form" render={ props => (<Form {...props} blogs={this.state.fields} onSubmit={this.onSubmit} />)} />
      <Route path="/filter" render={ props => (<Filter {...props} blogs={this.state.fields} onFilter={this.onFilter}/>)} />
      <Route component={Error} />
    </Switch>
    </div>
    )
  }

}

export default App;
