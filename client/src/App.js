import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost } from './actions/posts'
import BlogForm from './BlogForm'
import BlogUi from './BlogUi'
import Navbar from './Navbar'

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
      <Navbar/>
        {/* {this.renderPosts(this.props.allIds.map(id => this.props.byId[id]))} */}
        {this.props.allIds.map(id => {
          // CONTENT NOT CHANGING WHEN LINKS ARE CLICKED
          return <li key={id}><Link to={`/posts/${id}`} >{this.props.byId[id].title}</Link></li>
        // return <li key={id}>{this.props.byId[id].title} <button onClick={() => this.props.deletePost(id)}>delete</button></li>

        }
      )}
        {/* < BlogForm  /> */}
        <Switch>
          <Route exact path="/posts/new" component={BlogForm} />
          <Route exact path={`/posts/drafts/:postId/edit`} render={routerProps => <BlogForm post={this.props.byId[routerProps.match.params.postId]} {...routerProps} />} />
          <Route exact path='/posts/:postId' render={routerProps => <BlogForm key={routerProps.match.params.postId} post={this.props.byId[routerProps.match.params.postId]} {...routerProps} />} />
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

export default connect(mapStateToProps, { getPosts, deletePost })(App);
