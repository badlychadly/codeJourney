import React, { Component } from "react";
import ReactDOM from "react-dom";
import { EditorState, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from './plugins/addLinkPlugin'

const highlightPlugin = createHighlightPlugin();

export default class PostDisplay extends Component {
    state = {editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.post.body)))}
    
    onChange = (editorState) => {
        this.setState({editorState})
    }

    plugins = [
        highlightPlugin,
        addLinkPlugin
       ];
    

    render() {
        return (
            <div>
                <Editor onChange={this.onChange} plugins={this.plugins} editorState={this.state.editorState} readOnly={true} />
            </div>
        )

    }
} 