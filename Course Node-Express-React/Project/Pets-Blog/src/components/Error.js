import React from 'react';
import { Link } from "react-router-dom";
import errorImg from '../resources/images/error404.png';

const Error = ({ location }) => (
<div className="margin-top-bottom">
    <h3 className="text-center">There is no such page with sub-location <code>{location.pathname}</code>!</h3>
    <Link to="/"><img src={errorImg} className="img-responsive center-block" alt="logo" /></Link>  
  </div>
);

export default Error;