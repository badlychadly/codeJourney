import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogForm from './BlogForm'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    fetch('http://10.0.0.99:3001/api/posts')
    .then(resp => resp.json())
    .then(posts => this.setState({posts}))
  }


  render() {
    
    return this.state.posts ? (
      <div className="">
      {this.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
      < BlogForm  />
      </div>
    ) :
    <h2>Loading</h2>
  }
}

export default App;
