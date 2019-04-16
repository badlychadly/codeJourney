import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    fetch('http://10.0.0.99:3001/api/posts')
    .then(resp => resp.json())
    .then(data => this.setState({posts: data}))
  }


  render() {
    return (
      <div className="App">
      {this.state.posts.map(post => <li>{post.title}</li>)}
      </div>
    );
  }
}

export default App;
