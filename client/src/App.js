import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost } from './actions/posts'
import BlogForm from './BlogForm'
import BlogUi from './BlogUi'
import Navbar from './Navbar'
import PostDisplay from './PostDisplay'

class App extends Component {

  state = {selectedFile: null}

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    fetch('http://10.0.0.99:3001/api/upload',{
      method: 'POST',
      body: data
    }).then(resp => resp.json()).then(info => {
      debugger;
    })
}


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
      <input type="file" name="file" onChange={this.onChangeHandler}/>
      <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        {/* {this.renderPosts(this.props.allIds.map(id => this.props.byId[id]))} */}
        {this.props.allIds.map(id => {
          // CONTENT NOT CHANGING WHEN LINKS ARE CLICKED
          return <li key={id}><Link to={`/posts/${id}`} >{this.props.byId[id].title}</Link></li>
        // return <li key={id}>{this.props.byId[id].title} <button onClick={() => this.props.deletePost(id)}>delete</button></li>

        }
      )}
        {/* < BlogForm  /> */}
        <Switch>
          <Route exact path="/posts/new" readOnly={false} component={BlogForm} />
          <Route exact path={`/posts/drafts/:postId/edit`} render={routerProps => <BlogForm readOnly={false} post={this.props.byId[routerProps.match.params.postId]} {...routerProps} />} />
          <Route exact path='/posts/:postId' render={routerProps => <PostDisplay key={routerProps.match.params.postId} post={this.props.byId[routerProps.match.params.postId]} {...routerProps} />} />
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
