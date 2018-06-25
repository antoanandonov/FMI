import React, { Component } from 'react';
import axios from 'axios';
import cors from 'cors';

const KEY = 'a94b9a5c6d4843ad501987eb920fcc5f7bcc0ceaee5ca8a5a24938ced9e56c46';

export default class Pets extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            breed: '',
            description: '',
            image: '',
            isFetched: false,
            search: '',
            moreInfo: [],
            article1: '',
            article2: '',
            article3: '',
            article4: '',
            article5: '',
        }
        this.onSearch = this.onSearch.bind(this);
        this.onCreatePost = this.onCreatePost.bind(this);
    }

    onSearch = (evt) => {
        evt.preventDefault();
        this.setState({ breed: this.searchField.value });
        const searchPhrase = this.searchField.value.replace(/\s/g, "%20");
        this.getPetImage(searchPhrase);
        this.getPetInfo(searchPhrase);
        this.getMorePetInfo(searchPhrase);
        this.setState({isFetched: true});
    }

    getPetImage = (breed) => {
        axios.get(`https://api.unsplash.com/search/photos?client_id=${KEY}&page=1&query=` + breed.replace(/\s/g, "%20").trim(), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'POST, GET',
                'Access-Control-Allow-Headers' : 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then( ({ data: d }) => {
            const url = d.results[0].urls.full;
            this.setState({ image: url });
        })
        .catch(err => {
            console.log(err);
        });
    }

    getPetInfo = (breed) => {
        const url3 = "https://en.wikipedia.org/api/rest_v1/page/summary/";

        axios.get(`${url3}` + breed.replace(/\s/g, "%20").trim(),  cors(),{
        }).then( ({data:d} ) => {
            this.setState({ search: d });
        })
        .catch(err => {
            console.log(err);
        });
    }

    getMorePetInfo = (breed) => {
        const url7 = "https://en.wikipedia.org/api/rest_v1/page/related/";

        axios.get(`${url7}` + breed.replace(/\s/g, "%20").trim(),  cors(),{
        }).then( ({data:d} ) => {
            this.setState({ moreInfo: d.pages });
            this.setState({ article1: d.pages[0] });
            this.setState({ article2: d.pages[1] });
            this.setState({ article3: d.pages[2] });
            this.setState({ article4: d.pages[3] });
            this.setState({ article5: d.pages[4] });
        })
        .catch(err => {
            console.log(err);
        });
    }


    getResult = () => {
        return (
            <div className="">
                <h1>{this.state.image}</h1>
            </div>  
        );
    }

    onCreatePost = (evt) => {
        evt.preventDefault();
        const { onCreatePost } = this.props;
        const title = this.state.search.displaytitle;
        const c = this.state.search.extract;
        const a1 = this.state.article1;
        const a2 = this.state.article2;
        const a3 = this.state.article3;
        const a4 = this.state.article4;
        const a5 = this.state.article5;

        const content = title + "\n" + c + "\n\n" + a1.displaytitle + "\n" + a1.extract + "\n\n" + a2.displaytitle + "\n" + a2.extract + "\n\n" + a3.displaytitle + "\n" + a3.extract + "\n\n" + a4.displaytitle + "\n" + a4.extract + "\n\n" + a5.displaytitle + "\n" + a5.extract;
        const post = { title: title, description: content }
        
        onCreatePost(post);
    }

    fillResults = (img, title, content, a1, a2, a3, a4, a5) => {
        const { isLoggedIn } = this.props;
        return (
            <div className="margin-top-bottom">
                <div className="card mb-3">
                    <img className="card-img-top" src={img} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text text-justify">{content}</p>

                        <h5 className="card-title">{a1.displaytitle}</h5>
                        <p className="card-text text-justify">{a1.extract}</p>
                        <h5 className="card-title">{a2.displaytitle}</h5>
                        <p className="card-text text-justify">{a2.extract}</p>
                        <h5 className="card-title">{a3.displaytitle}</h5>
                        <p className="card-text text-justify">{a3.extract}</p>
                        <h5 className="card-title">{a4.displaytitle}</h5>
                        <p className="card-text text-justify">{a4.extract}</p>
                        <h5 className="card-title">{a5.displaytitle}</h5>
                        <p className="card-text text-justify">{a5.extract}</p>
                    </div>
                    { isLoggedIn ? ( <button type="submit" className="btn btn-lg btn-outline-success mb-2 float-right margin-left-right" onClick={this.onCreatePost}>Create Post</button> ) : ( <div/> ) }
                </div>
            </div>
        );
    }

    searchForm = () => {
        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="col col-sm-10">
                            <input type="email" className="form-control form-control-lg" id="colFormLabelLg" placeholder="Search" ref={searchField => this.searchField = searchField}/>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-lg btn-outline-primary mb-2 float-right" onClick={this.onSearch}>Search</button>
                        </div>
                    </div>
                </form>
            </div>  
        );
    }

    render() {
        return (
            <div className="App margin-top-bottom container">
                <ul className="list-group">
                    <li className="list-group-item margin-top-bottom ">
                        <h1 className="margin-top" >Search for pet...</h1>
                        <div className="margin container">
                            { this.searchForm() }            
                        </div>
                    </li>
                </ul>
                {
                        this.state.isFetched ? this.fillResults(this.state.image, this.state.search.displaytitle, this.state.search.extract, this.state.article1, this.state.article2, this.state.article3, this.state.article4, this.state.article5) : <div/>
                }
            </div>
        );
    }
}