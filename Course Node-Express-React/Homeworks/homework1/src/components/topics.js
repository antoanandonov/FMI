import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './Topics.css';

const Topics = ({ match, location, history, topics }) => (
  
  <div>
    <h2 className="text-center">Blog Topics</h2>
    <hr/>
    <div className="row no-gutters">
      <div className="col-6 col-md-4">
      <nav className="Topics-nav">
          <ul> 
              { topics.map(topic => (
                  <li key={topic.title}>
                      <Link to={`${match.url}/${topic.title}`}>{topic.title}</Link>
                  </li>
              ))}
          </ul>
      </nav>
      </div>
      
    </div>
      <Route path={`${match.url}/:topicTile`} render={({ match }) => {
          console.log(topics);
          console.log(match.params.topicTile); //title
          return (
          <article>
              <h3>{match.params.topicTile}</h3>
              <div>{topics.find(t => t.title === match.params.topicTile).content}</div>
          </article>);
      }} />
  </div>
);

export default Topics;