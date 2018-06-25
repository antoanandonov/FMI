import React, { Component } from 'react';

export default class Calculator extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            image: "",
            // user: this.props.user,
            pets: this.props.petsByUser

        }

        this.onCalculate = this.onCalculate.bind(this);
    }

    onCalculate = (evt) => {
        evt.preventDefault();

        const weight = this.weigth.value;
        const age = this.age.value;

        this.checkHealth(age, weight);

        this.weigth.value ='';
        this.age.value = '';
    }

    checkHealth = (age, weigth) =>{
        var eat = "50 g";
        if (weigth >= 1250 && weigth < 3000){
            eat = "20-40 g"
        }else if(weigth >= 3000 && weigth < 5000){
            eat = "40-60 g"
        }else if(weigth >= 5000 && weigth <= 8000){
            eat = "60-100 g"
        }

        alert(`Your pet must eat ${eat} per day.`);
    }

    getForm = () => {
        return (
            <div>
                <form className="margin-top-bottom form shadow form-control-lg form-control">
                    <div className="padding-top">
                        {/* <img className="mb-4" src={avatarImg} alt="" width="150" height="150"/> */}
                    </div>
                    
                    <div className="form-row padding-bottom">
                        <div className="col"><input type="text" id="weight" className="shadow form-control-lg form-control" placeholder="Enter pet's weigth" ref={weigth => this.weigth = weigth}/></div>
                    </div>

                    <div className="form-row padding-bottom">
                        <div className="col"><input type="text" id="age" className="shadow form-control-lg form-control" placeholder="Enter pet's age" ref={age => this.age = age}/></div>
                    </div>
                         
                    <div className="padding-top padding-bottom"><button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onCalculate}>Calculate</button></div>
                    
                </form>
            </div>
        )
    }

    render() {
        return (
            <div className="App  margin-top-bottom">
                <h3>Calculate your pet's health condition</h3>
               { this.getForm() }
            </div>
        );
    }

}