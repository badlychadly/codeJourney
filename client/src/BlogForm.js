import React, { Component } from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/markdown/markdown.js')
require ('codemirror/lib/codemirror.css')


export default class BlogForm extends Component {
    state = {
        text: ""
    }

    handleChange = (e, data, value) => {
        this.setState({
            text: value
        })
    }


    render() {
        return (
            <div>

                <CodeMirror value={this.state.text} onChange={this.handleChange}/>
            </div>
                
        )
    }
}