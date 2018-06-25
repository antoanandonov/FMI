import React from 'react';
import error from '../images/error404_not_found.png';
import { Link } from "react-router-dom";

const Error = ({ location }) => (
<div>
    <h3 className="text-center">There is no such page with sub-location<code>{location.pathname}</code>!</h3>
    <Link to="/"><img src={error} className="img-responsive center-block" alt="logo" /></Link>
    <h3 className="text-center">Please click the image to go back!</h3>
    <hr/>
  </div>
);

export default Error;