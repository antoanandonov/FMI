import React, { Component } from 'react';
import axios from 'axios';
import cors from 'cors';
import zabivaka from '../resources/images/world-cup/zabivaka.gif';

const KEY = 'c60f7f6aa5f137f47a6dbf213f6e5e2a'

export default class Home extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            weather:{},
            temp:{}
        }
        
    }

    componentWillMount(){
        this.checkWeather('Sofia');
    }

    checkWeather = (city) => {
        const currentWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${KEY}`;
        // const weeklyWeather = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&mode=json&APPID=${KEY}`
        // const url = "http://l2.io/ip.js";
        axios.get(currentWeather,  cors(),{
        })
        .then( ({data:d} ) => {
            this.setState({temp:d.main});
        })
        .catch(err => {
            console.log(err);
        });
    }

    loadWeatherData = (t) => {  
        return (
            <div>
                <h5 className="text-primary">Temp: {t.temp} &deg;C</h5>
                <h5 className="text-secondary">Pressure: {t.pressure} hPa</h5>
                <h5 className="text-secondary">Humidity: {t.humidity}%</h5>
                <h5 className="text-success">Max: {t.temp_max} &deg;C</h5>
                <h5 className="text-danger">Min: {t.temp_min} &deg;C</h5>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <div className="jumbotron">
                    <h1 className="display-4">Hello, world!</h1>
                    <div><img className="mb-4" src={zabivaka} alt="" /></div>
                    <hr className="my-4"/>
                    <p>The weather for today in Sofia is as follow:</p>
                    { this.loadWeatherData(this.state.temp) }
                </div>
            </div>
        );
    }
}
