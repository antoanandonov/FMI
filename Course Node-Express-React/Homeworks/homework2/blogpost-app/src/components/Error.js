import React from 'react';
import error from '../resources/images/error404_not_found.png';
import { Link } from "react-router-dom";

const Error = ({ location }) => (
<div>
  <hr/>
    <h3 className="text-center">There is no such page with sub-location<code>{location.pathname}</code>!</h3>
    <Link to="/"><img src={error} className="img-responsive center-block" alt="logo" /></Link>  
    <hr/>
  </div>
);

export default Error;