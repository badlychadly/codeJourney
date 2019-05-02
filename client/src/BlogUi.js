import React, { Component } from 'react'


export default class BlogUi extends Component {

    render() {
        return (
            <div className="blogUi" style={{width: "90vw", height: "50vh", margin: "auto"}} role="textbox" contentEditable="true" aria-multiline="true" 
            aria-labelledby="txtboxMultilineLabel" aria-required="true">
                
            </div>
        )
    }
}