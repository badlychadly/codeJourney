import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost } from './actions/posts'
import PostEditor from './containers/PostEditor'
import Navbar from './containers/Navbar'
import PostDisplay from './containers/PostDisplay'
import RenderPosts from './components/RenderPosts'
import LoginForm from './containers/LoginForm'
import AdminLoginRoute from './customRoutes/AdminLoginRoute'
import SavingIcon from './containers/savingIcon'

class App extends Component {

  inputRef = React.createRef()



  componentDidMount() {
    this.props.getPosts()
  }

  // renderPosts = (posts) => {
  //   return this.props.allIds.map(id => {
  //     // console.log(this.props.byId[id].updated_at)
  //     const date = new Date(this.props.byId[id].updated_at)
  //     const month = date.getMonth()
  //     const year = date.getFullYear()
  //     const day = date.getDate()
  //     const time = date.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
  //     // debugger;
  //       // console.log(date.getDate())
  //     return (<div key={id}>
  //       <Link style={{textDecoration: 'none'}} to={`/posts/${id}`} >
  //         <h2 style={{margin: '.5rem 0', color: '#08090f'}}>{this.props.byId[id].title}</h2>
  //         <div  style={{fontSize: '.9rem', marginBottom: '1.5rem', color: 'rgba(0,0,0,.54)', fontWeight: 500, fill: 'rgba(0,0,0,.54)'}}>
  //           <span style={{padding: '.5rem'}}>{`${month}/${day}/${year}`}</span>
  //           <span style={{padding: '.5rem'}}>{time}</span>
  //         </div>
  //       </Link>
  //     </div>)
  //   // return <li key={id}>{this.props.byId[id].title} <button onClick={() => this.props.deletePost(id)}>delete</button></li>

  //     }
  //   )
  // }


  render() {
    // debugger;
    return Object.keys(this.props.byId).length ? (
      <div className="">
      <Navbar loggedIn={this.props.loggedIn}/>
      {/* <LoginForm/> */}

        {/* <Route exact path="/admin/login" component={LoginForm} /> */}
        <AdminLoginRoute path="/admin/login" loggedIn={this.props.loggedIn} component={LoginForm} history={this.props.history} />

        <Switch>
          <Route path="/posts/new" 
          readOnly={false} 
          render={ routerProps => this.props.loggedIn ? (
              <PostEditor key={routerProps.match.path} {...routerProps}/>
            ) :
              (<Redirect to="/" />)
            }
          />

          <Route exact path={`/posts/drafts/:postId/edit`}
            render={routerProps => this.props.loggedIn ? (
                <PostEditor readOnly={false} 
                  post={this.props.byId[routerProps.match.params.postId]} 
                  {...routerProps} />
              ) : (<Redirect to="/" />)
            } 
          />

          <Route exact path="/posts/drafts" 
            render={routerProps => this.props.loggedIn ? (
              <RenderPosts 
                isEdit={true} 
                byId={this.props.byId} 
                allIds={this.props.allIds} 
                deletePost={this.props.deletePost} 
                {...routerProps} 
              />) : (<Redirect to="/" />)
            } 
          />
          <Route exact path='/posts/:postId' render={routerProps => <PostDisplay key={routerProps.match.params.postId} post={this.props.byId[routerProps.match.params.postId]} {...routerProps} />} />
          <Route exact path="/" render={routerProps => <RenderPosts isEdit={false} byId={this.props.byId} allIds={this.props.allIds} {...routerProps} />} />
          
        </Switch> 
        <SavingIcon />
      </div>
    ) :
    <h2>Loading</h2>
  }
}

const mapStateToProps = (state) => {
  return ({
    byId: state.posts.byId,
    allIds: state.posts.allIds,
    loggedIn: state.loggedIn
    // saving: state.ui.isSaving,
    // saved: state.ui.saveSuccess
  })
}

export default connect(mapStateToProps, { getPosts, deletePost })(App);
