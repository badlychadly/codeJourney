import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { getPosts } from './actions/posts'
import BlogForm from './BlogForm'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    this.props.getPosts()
  }


  render() {
    
    return this.props.posts.length ? (
      <div className="">
      {this.props.posts.map(post => <li key={post.id}>{post.title}</li>)}
      < BlogForm  />
      </div>
    ) :
    <h2>Loading</h2>
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return ({
    posts: state
  })
}

export default connect(mapStateToProps, { getPosts })(App);
