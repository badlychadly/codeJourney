import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from './actions/posts'
import BlogForm from './BlogForm'
import BlogUi from './BlogUi'

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
      {/* < BlogForm  /> */}
      <Switch>
        <Route exact path="/posts/new" component={BlogForm} />
        <Route exact path={`/posts/:postId/edit`} render={routerProps => <BlogForm post={this.props.byId[routerProps.match.params.postId]} {...routerProps} />} />
        <Route exact path="/blog_ui" component={BlogUi} />
      </Switch> 
      </div>
    ) :
    <h2>Loading</h2>
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return ({
    byId: state.posts.byId,
    allIds: state.posts.allIds
  })
}

export default connect(mapStateToProps, { getPosts })(App);
