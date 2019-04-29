import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { getPosts } from './actions/posts'
import BlogForm from './BlogForm'

class App extends Component {


  componentDidMount() {
    this.props.getPosts()
  }

  renderPosts = (posts) => {
    return posts.map(post => <li key={post.id}>{post.title}</li> )
  }


  render() {
    // debugger;
    return Object.keys(this.props.byId).length ? (
      <div className="">
      {/* {this.renderPosts(this.props.allIds.map(id => this.props.byId[id]))} */}
      {this.props.allIds.map(id => <li key={id}>{this.props.byId[id].title}</li>)}
      < BlogForm  />
      </div>
    ) :
    <h2>Loading</h2>
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return ({
    byId: state.posts.byId,
    allIds: state.posts.allIds
  })
}

export default connect(mapStateToProps, { getPosts })(App);
