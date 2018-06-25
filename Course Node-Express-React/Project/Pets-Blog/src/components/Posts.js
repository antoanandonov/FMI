import React, { Component } from 'react';
import Post from './Post'

export default class Posts extends Component {

    constructor(props){
        super(props);
        
        this.state = {
        }
    }

    componentWillMount(){
        this.props.loadPosts();
    }

    render() {
        const { posts, onEditPost, onDeletePost, user } = this.props;
        return (
            <div className="App margin-top-bottom container">
                <hr/>
                {
                    posts.map(post => {
                        return (<Post key={post.id} {...post} user={user} onEditPost={onEditPost} onDeletePost={onDeletePost}/>);
                    })
                }
            </div>
        );
    }
}