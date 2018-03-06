import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Navigation from '../components/Navigation/Navigation';
import Register from '../components/Register/Register';
import Signin from '../components/Signin/Signin';
import Footer from '../components/Footer/Footer';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import './App.css';

import { particleOptions } from './initial';
import { initialState } from './initial';

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentWillMount() {
    document.title = 'SMARTBRAIN'
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  CalculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height= Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow:height - clarifaiFace.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://stormy-brushlands-16218.herokuapp.com/imageurl', {      
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://stormy-brushlands-16218.herokuapp.com/image', {      
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json()).then(count => {
          this.setState(Object.assign(this.state.user, {
            entries: count
          }))
        }).catch(err => console.log(err));
      }
      this.displayFaceBox(this.CalculateFaceLocation(response))
    }).catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box, user} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route ==='home'?
          <div className='home'>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div> :
          <div>
            {
            route ==='signin'?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : 
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            }
            <Footer />
          </div>
        }
      </div>
    );
  }
}

export default App;
