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
    .then(data => this.setState({posts: data}))
  }


  render() {
    return (
      <div className="App">
      {this.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
      < BlogForm />
      </div>
    );
  }
}

export default App;
