import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from './actions/posts'


class BlogForm extends Component {

    state = {
        title: "",
        body: "",
        newPost: {}
    }

    componentDidMount() {
        // console.log(this.props)
        // this.props.post && this.setState({data: this.props.post.title})
    }

    handleOnChange = (event, editor) => {
        const body = editor.getData();
        let title;
        if (!!body) {
            // debugger;
            title = body.includes("<h2>") ? /<h2>(.*?)<\/h2>/gm.exec(body)[1] : ""
            this.setState({body, title: title})
            console.log( { event, editor, body } );
        }
    }

    handleOnSubmit = (event, editor) => {
        // let state = this.state
        event.preventDefault()
        // fetch('http://10.0.0.99:3001/api/posts', {
        //     method: "POST",
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(this.state)
        // }).then(resp => resp.json()).then(newPost => {
        //     this.setState({newPost})
        // })
        this.props.addPost(this.state)

    }


    render() {
        console.log(this.state)
        return (
            <div>
               
            </div>                
        )
    }
}

export default connect(null, { addPost })(BlogForm);