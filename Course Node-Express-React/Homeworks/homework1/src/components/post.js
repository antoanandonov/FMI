import React from 'react';
import MarkDown from './get-markdown';
import { withRouter, /*Link,*/ Route } from 'react-router-dom';
import EditForm from './edit-form';

const Post = ({ post, blogs, onDelete, ...props }) => (
    <div className='item-row'>
        <div>
            <div className='item-row-title'>
                <span>{post.title}</span>
            </div>
            <div >
                {/* {console.log(props)} */}
            <hr/>
                <h3>
                     {post.title}
                     {/* <Link to={'/edit/'+post.id} ><button className="btn btn-primary" onClick={handleEdit(post, props)}>Edit</button></Link> */}
                    {/* <button className="btn btn-primary" onClick={() => onDelete(post.id)}>Delete</button> */}
                </h3>
                <h6 className='break-word-test' dangerouslySetInnerHTML={MarkDown(post.content)} />
                <h6>URL: <a href={post.url} target="_blank">{post.url}</a></h6>
                <h6>Author: {post.author}</h6>
                <h6>State: {post.state === 'active' ? <font color="green">{post.state}</font> : <font color="red">{post.state}</font>}</h6>
                <h6>Date: {new Date(post.date).toLocaleDateString()}</h6>
                <h6>Tags: {post.tags}</h6>
              </div>
        </div>
        <div>
        <Route path={`/edit/:id`} render={({ match, props }) => {
                  return (
                      <div>
                        <EditForm {...props} blogToEdit={blogs.find(t => t.id === match.params.id)} onEdit={this.onEdit}/>
                      </div>
                  );
              }} />
        </div>
    </div>
);

export default withRouter(Post);