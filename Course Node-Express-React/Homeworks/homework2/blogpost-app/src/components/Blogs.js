import React, { Component } from 'react';
import BlogItem from './BlogItem'

class Blogs extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    const { blogs, onDelete, onEditSubmit } = this.props;
    return (
      <div className="container">
        <div className="margin-top-bottom">
          <h1>Blogs</h1>
        </div>
        <hr/>
        {
            blogs.map(blog => {
            return (<BlogItem key={blog.id} {...blog} onDelete={onDelete} onEditSubmit={onEditSubmit}/>);
          })
        }
      </div>
    );
  }
}

export default Blogs;