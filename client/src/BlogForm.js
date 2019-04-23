import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class BlogForm extends Component {

    state = {
        body: ""
    }

    componentDidMount() {
        // console.log(this.props)
        // this.props.post && this.setState({data: this.props.post.title})
    }

    handleOnChange = (event, editor) => {
        const body = editor.getData();
        this.setState({body})
        console.log( { event, editor, body } );
    }

    handleOnSubmit = (event, editor) => {
        // let state = this.state
        event.preventDefault()
        // debugger;
        fetch('http://10.0.0.99:3001/api/posts', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then(resp => resp.json()).then(data => {
            debugger;
        })

    }


    render() {
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>

                <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.body}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ this.handleOnChange }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                    // disabled
                />
                <input type="submit" value="submit"/>
                </form>
            </div>                
        )
    }
}