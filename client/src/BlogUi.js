import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class BlogUi extends Component {

    state = {
        "1": {el: "h1", text: ""}
    }

    handleOnClick = e => {
        e.preventDefault()
        document.execCommand("bold", false)
        // this.setState({components: [...this.state.components, "h3"]})
    }

    renderComponents = () => {
        this.state.components.map(c => <h3><span defaultValue="hello"></span></h3>)
    }

    handleOnChange = (e) => {
        let com  = this
        let node = ReactDOM.findDOMNode(this)
        debugger;
        console.log(this.h3)
        document.execCommand("bold", false)
        // document.execCommand('bold',false,'')
        // debugger;
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <button onClick={this.handleOnClick}>add</button>
                <div onInput={this.handleOnChange} className="blogUi" style={{width: "90vw", height: "50vh", margin: "auto"}} role="textbox" contentEditable="true" suppressContentEditableWarning={true} aria-multiline="true" 
                aria-labelledby="txtboxMultilineLabel" aria-required="true">
                    <h3 ref={(input) => this.h3 = input} onChange={this.handleOnFocus}>Title</h3>
                    <div>b</div>
                    {/* {this.state.components.map(c => <h2>{c}</h2>)} */}
                </div>

            </div>
        )
    }
}