import React, { Component } from 'react'

export default class TestFileInput extends Component {
    // inputRef = React.createRef()
    componentDidMount() {
        // debugger
        // this.inputRef.current.click()
    }
    render() {
        // debugger;
        return (
            <input ref={this.props.myInputRef} type="file" name="file" id=""/>
        )

    }
}