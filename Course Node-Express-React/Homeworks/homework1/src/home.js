import React, { } from 'react';
import logo from './logo.png';
import { Link } from "react-router-dom";
import './home.css';

const Home = () => (
  <div className="text-center">
    <hr/>
    <Link to="/blogs"><img src={logo} className="base-logo" alt="logo" /></Link>
  </div>
);

export default Home;
