import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class RenderPosts extends Component {

  deletePost = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.deletePost(id)
  }

    renderPosts = (posts) => {
        return this.props.allIds.map(id => {
          // console.log(this.props.byId[id].updated_at)
          const { path } = this.props.match
          const date = new Date(this.props.byId[id].updated_at)
          const month = date.getMonth()
          const year = date.getFullYear()
          const day = date.getDate()
          const time = date.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
          // debugger;
            // console.log(date.getDate())
          return (<div style={{width: "100%",
          paddingRight: "15px",
          paddingLeft: "15px",
          marginRight: "auto",
          marginLeft: "auto"}} key={id}>
            <Link style={{textDecoration: 'none'}} to={ path.includes('drafts') ? `/posts/drafts/${id}/edit` : `/posts/${id}`} >
              <h2 className="link-post-title" style={{margin: '.5rem 0', color: '#08090f'}}>{this.props.byId[id].title}</h2>
              <div  style={{fontSize: '.9rem', marginBottom: '1.5rem', color: 'rgba(0,0,0,.54)', fontWeight: 500, fill: 'rgba(0,0,0,.54)'}}>
                <span style={{padding: '.5rem'}}>{`${month}/${day}/${year}`}</span>
                <span style={{padding: '.5rem'}}>{time}</span>
                { this.props.isEdit && (
                  <span>
                    <i style={{verticalAlign: 'middle', marginLeft: '2rem'}} class="material-icons edit">edit</i>
                    <i style={{verticalAlign: 'middle', marginLeft: '2rem'}} onClick={ e => this.deletePost(e,id)} class="material-icons delete">delete_forever</i>
                  </span>
                )}
              </div>
            </Link>
          </div>)
        // return <li key={id}>{this.props.byId[id].title} <button onClick={() => this.props.deletePost(id)}>delete</button></li>
    
          }
        )
      }


    render() {
      // debugger;
        return (
            <div>
              <h1 style={{textAlign: 'center', textDecoration: 'underline'}}>{this.props.isEdit ? 'Drafts' : 'Posts'}</h1>
                {this.renderPosts()}
            </div>
        )
    }
}