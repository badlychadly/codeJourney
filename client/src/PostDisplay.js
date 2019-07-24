import React, { Component } from "react";
import ReactDOM from "react-dom";
import { EditorState, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from './plugins/addLinkPlugin'
import { getBlockStyle } from './toolbar/Toolbar'

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
            <div className="post-display" style={{display: 'flex', margin: 'auto', maxWidth: '728px'}}>
                <Editor onChange={this.onChange} blockStyleFn={getBlockStyle} plugins={this.plugins} editorState={this.state.editorState} readOnly={true} />
            </div>
        )

    }
} 