import React, { Component } from 'react';
import {  Link , BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import axios from 'axios';

import logo from './resources/images/logo.svg';
import './css/App.css';
import './css/style.css';

import Home from './components/Home'
import Pets from './components/Pets'
// import AddPet from './components/AddPet'
import Users from './components/Users'
import Profile from './components/Profile'
import Posts from './components/Posts'
import Search from './components/Search'
import Login from './components/Login'
import Signin from './components/Signin'
import Error from './components/Error'

const host = 'http://localhost:3003';

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      user: {},
      users: [],
      pets: [],
      posts: [],
      petsByUser: [],

      hasError: false,
      error: {},
      hasSucceeded : false,
      successMessage: '',

      isLoggedIn: false,
      isSignedIn: false,
      isAdmin: false      
    }

    this.onSignin = this.onSignin.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onEditPet = this.onEditPet.bind(this);
    this.onDeletePet = this.onDeletePet.bind(this);
    this.onCreatePost = this.onCreatePost.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
    this.onEditPost = this.onEditPost.bind(this);
    this.onCloseAlert = this.onCloseAlert.bind(this);

    this.loadPets = this.loadPets.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.loadPetsByUser = this.loadPetsByUser.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    
  }

  componentWillMount(){
    this.onLogin({ userNameOrEmail:"antoan.andonov", password:"admin"});
  }

  getPets(){
    return this.state.pets;
  }

  getPosts(){
    return this.state.posts;
  }

  getUsers(){
    return this.state.users;
  }

  loadPosts = () => {
    if(this.state.isLoggedIn){
      axios.get(`${host}/api/posts`)
      .then(({ data: posts }) => this.setState({posts:posts}))
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }


  loadPets = () => {
    if(this.state.isAdmin){
      axios.get(`${host}/api/pets`)
      .then(({ data: pets }) => this.setState({pets:pets}))
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }

  loadPetsByUser = () => {
    axios.get(`${host}/api/${this.state.user.userName}/pets`)
    .then(({ data: pets }) => this.setState({petsByUser:pets}))
    .catch(err => {
      this.setState({ hasError: true });
      this.setState({ error: err.response });
    })
  }

  loadUsers = () => {
    if(this.state.isAdmin){
        axios.get(`${host}/api/users`)
      .then(({ data: users }) => this.setState({users:users}))
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }

  loadProfile = () => {
    axios.get(`${host}/api/profile/` + this.state.user.userName)
    .then(({ data: user }) => this.setState({user:user}))
    .catch(err => {
      this.setState({ hasError: true });
      this.setState({ error: err.response });
    })
  }

  onLogout = () => {
    this.setState({
      user: {},
      isLoggedIn: false,
      isAdmin: false,   
    })
  }

  onLogin = (user) =>{
    axios.post(`${host}/api/login`, user)
    .then(({ data: user }) => this.setState({user:user, isAdmin: user.isAdmin, isLoggedIn: true, hasSucceeded: true, successMessage: `You are logged in!` }))
    .catch(err => {
      this.setState({ isLoggedIn: false });
      this.setState({ hasError: true });
      console.log(err);
      // this.setState({ error: err.response });
    })
  }

  onSignin = (user) => {
    axios.post(`${host}/api/signin`, user)
    .then(() => {
      this.setState({ hasSucceeded: true });
      this.setState({ successMessage: `You are signed in!` });
    })
    .catch(err => {
      this.setState({ hasError: true });
      this.setState({ error: err.response });
    })
  }
  
  onAddPet = (pet) => {
    axios.put(`${host}/api/pets/add`, pet)
    .then(() => {
      const pets = this.getPets();
      pets.push(pet);
      this.setState({pets: pets});
    } )
    .catch(err => {
      this.setState({ hasError: true });
      this.setState({ error: err.response });
    })
  }

  onEditPost = (post) => {
    if(this.state.isLoggedIn){
      post.userName = this.state.user.userName;
      axios.put(`${host}/api/posts/${post.id}`, post)
      .then(() => {
        const posts = this.getPosts();
        const index = posts.findIndex(p => p.id === post.id);
        posts[index] = post;
        this.setState({posts: posts});
      } )
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }

  onEditPet = (pet) => {
    if(this.state.isLoggedIn){
      axios.post(`${host}/api/pets/${pet.id}`, pet)
      .then(() => {
        const pets = this.getPets();
        const index = pets.findIndex(p => p.id === pet.id);
        pets[index] = pet;
        this.setState({pets: pets});
      } )
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }

  onDeletePet = (petId) => {
    if(this.state.isLoggedIn){
      axios.delete(`${host}/api/pets/${petId}`)
      .then(({ data: pet }) => {
        console.log(pet);
        const pets = this.getPets();
        const index = pets.findIndex(p => p.id === petId);
        pets.splice(index, 1);
        this.setState({pets: pets});
      })
    }
  }

  onDeletePost = (postId) => {
    if(this.state.isLoggedIn){
      axios.delete(`${host}/api/posts/${postId}`)
      .then(({ data: post }) => {
        console.log(post);
        const posts = this.getPets();
        const index = posts.findIndex(p => p.id === postId);
        posts.splice(index, 1);
        this.setState({posts: posts});
      })
    }
  }

  onEditProfile = (user) => {
    if(this.state.isLoggedIn){
      axios.put(`${host}/api/${user.userName}/edit`, user)
      .then(() => this.setState({user:user}))
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }

  onCreatePost = (post) => {
    if(this.state.isLoggedIn){
      post.userName = this.state.user.userName;
      axios.post(`${host}/api/posts/add`, post)
      .then(() => {
        // const editedPosts = this.getPosts();
        // editedPosts.put(post);
        // this.setState({posts: editedPosts})
      })
      .catch(err => {
        this.setState({ hasError: true });
        this.setState({ error: err.response });
      })
    }
  }

  onCloseAlert(evt){
    evt.preventDefault();
    this.setState({ hasError: false, hasSucceeded: false });
  }

  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">

              <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <a className="navbar-brand "><img src={logo} className="App-logo" alt="logo"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>

              <div className="mx-auto order-0">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/"><h5 >Home</h5></Link>
                  </li>
                  {
                    (this.state.isLoggedIn === true) ? (
                      <li className="nav-item">
                        <Link className="nav-link" to="/posts"><h5 >Posts</h5></Link>
                      </li>
                    ) : ( <li/> )
                  }
                  {
                      (this.state.isAdmin  === 'true') ? (
                        <li className="nav-item">
                          <Link className="nav-item nav-link" to="/pets"><h5 >Pets</h5></Link>
                        </li>
                    ) : ( <li/> )
                  }
                  {
                    (this.state.isAdmin  === 'true') ? (
                      <li className="nav-item">
                        <Link className="nav-item nav-link" to="/users"><h5 >Users</h5></Link>
                      </li>
                    ) : ( <li/> )
                  }
                  <li className="nav-item">
                    <Link className="nav-link" to="/search"><h5 >Search</h5></Link>
                  </li>
                </ul>
              </div>

              <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item ">
                        <Link className="nav-link" to="/signin"><h5 >Sign in</h5></Link>
                      </li>
                      <li className="nav-item ">
                        { !this.state.isLoggedIn ? <Link className="nav-link" to="/login"><h5 >Login</h5></Link> : <Link className="nav-link" to="/profile"><h5 >{this.state.user.userName}</h5></Link> }
                      </li>
                  </ul>
              </div>

            </nav>
          </header>
          {
            this.state.hasError ? (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {window.scrollTo(0, 0)}
                <strong>ERROR: {this.state.error.status} - {this.state.error.statusText}!</strong>
                <br/>
                <p>{this.state.error.data}</p>
                <button onClick={this.onCloseAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : this.state.hasSucceeded ? (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {window.scrollTo(0, 0)}
                <strong>{this.state.successMessage}</strong>
                <button onClick={this.onCloseAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : ( <div/> )
          }
          <Switch>
            <Route exact path="/" render={ () => (<Home {...this.state}/>)}/>
            <Route path="/pets" render={ () => (<Pets {...this.state} loadPets={this.loadPets} load='allPets' onEditPet={this.onEditPet} onDeletePet={this.onDeletePet}/>)}/>
            {/* <Route path="/pets/add" render={ () => (<AddPet {...this.state} onAddPet={this.onAddPet}/>)}/> */}
            <Route path="/users" render={ () => (<Users {...this.state} loadUsers={this.loadUsers} onEditProfile={this.onEditProfile}/>)}/>
            <Route path="/posts" render={ () => (<Posts {...this.state} loadPosts={this.loadPosts} onEditPost={this.onEditPost} onDeletePost={this.onDeletePost}/>)}/>
            <Route path="/profile" render={ () => (<Profile {...this.state} onEditProfile={this.onEditProfile} loadPetsByUser={this.loadPetsByUser} loadProfile={this.loadProfile} onEditPet={this.onEditPet} onDeletePet={this.onDeletePet} onAddPet={this.onAddPet} onLogout={this.onLogout}/>)}/>
            <Route path="/login" render={ () => this.state.isLoggedIn ? ( <Redirect to="/"/> ) : (<Login {...this.state} onLogin={this.onLogin}/>)}/>
            <Route path="/search" render={ () => (<Search {...this.state} onCreatePost={this.onCreatePost}/>)}/>
            <Route path="/signin" render={ () => (<Signin {...this.state} onSignin={this.onSignin}/>)}/>
            {/* <Route path="/profile/edit" render={ () => (<EditProfile {...this.state} onEditProfile={this.onEditProfile}/>)}/> */}
            {/* <Route path="/profile/pets" render={ () => (<Pets {...this.state} loadPetsByUser={this.loadPetsByUser}  load='petsByUser'/>)}/> */}
            <Route path="*" component={Error} />
          </Switch>
        </div>
        
      </BrowserRouter>

      </div>
    );
  }
}

export default App;
