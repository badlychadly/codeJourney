import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, updatePost } from './actions/posts'


import {
	// Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    Modifier,
    getDefaultKeyBinding,
    KeyBindingUtil
} from "draft-js";
// import Draft from 'draft-js'
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from './plugins/addLinkPlugin'
import Toolbar, { getBlockStyle } from './toolbar/Toolbar'

const {hasCommandModifier} = KeyBindingUtil;

const highlightPlugin = createHighlightPlugin();

const rawBlock = {
  "entityMap": {},
  "blocks": [
      {
          "key": "5h45l",
          "text": "",
          "type": "header-one",
          "depth": 0,
          "entityRanges": [],
          "inlineStyleRanges": [],
          "data": {title: ""}
      }
  ]
}





class BlogForm extends Component {
    // convertedContent = convertFromRaw(rawBlock)
    state = !!this.props.post ? ({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.post.body)))
    }) : ({
        editorState: EditorState.createWithContent(convertFromRaw(rawBlock))
    })
    onChange = (editorState) => {
        this.setState((prevState, props) => {
            // debugger;
            return {editorState}
        });
    }

    plugins = [
        highlightPlugin,
        addLinkPlugin
       ];

       textInput = React.createRef();
  


handleKeyCommand = (command, editorState) => {
  const testUtils = RichUtils
    const newState = RichUtils.handleKeyCommand(
        this.state.editorState,
        command
    );
    // debugger;
    if (command === "split-block") {
        const blockType = editorState.getCurrentContent().getLastBlock().getType()
      const checkMod = Modifier.splitBlock(this.state.editorState.getCurrentContent(), this.state.editorState.getSelection())
      const newEState = EditorState.push(this.state.editorState, checkMod, command)
        if (blockType.includes("header")) {
            this.onChange(RichUtils.toggleBlockType(newEState, 'unstyled'))
            return "handled"
            
        }
    }
    if (command === 'myeditor-save') {
        const title = editorState.getCurrentContent().getFirstBlock().getData().get("title")
        // debugger;
        if (!!editorState.getLastChangeType()) {
            if (!!this.props.post) {
                this.props.updatePost(this.props.post.id, {title: title, body: convertToRaw(editorState.getCurrentContent())})
            } else {
                this.props.addPost({title: title, body: convertToRaw(editorState.getCurrentContent())}, this.props.history)
    
            }   
        }
        return "handled"
    }
    if (newState) {
        this.onChange(newState);
        return "handled";
    }
    return "not-handled";
};


keyBindingFn = (e) => {
    if (e.key === "s" && hasCommandModifier(e) ) {
        // debugger;
      return 'myeditor-save'
    }
    if (hasCommandModifier(e) && e.key === "h") {
        return "highlight";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "k") {
        return "add-link";
    }
    if (e.key === 'Backspace' && this.state.editorState.getCurrentContent().getFirstBlock().getKey() === this.state.editorState.getSelection().getStartKey() && !this.state.editorState.getCurrentContent().getFirstBlock().getText()) {
        return "handled"
    }
    return getDefaultKeyBinding(e)
  }

onAddLink = (e) => {
  e.stopPropagation()
  const editorState = this.state.editorState;
  const selection = editorState.getSelection();
  // debugger;
  const link = window.prompt("Paste the link -");
  if (!link) {
    this.onChange(RichUtils.toggleLink(editorState, selection, null));
    return "handled";
  }
  const content = editorState.getCurrentContent();
  const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
    url: link
  });
  const newEditorState = EditorState.push(
    editorState,
    contentWithEntity,
    "create-entity"
  );
  const entityKey = contentWithEntity.getLastCreatedEntityKey();
  // const rawhtml = convert
  const richUtilsLink = RichUtils.toggleLink(newEditorState, selection, entityKey)
  const hasLink = RichUtils.currentBlockContainsLink(richUtilsLink)
//   debugger;
  this.onChange(this.setSelection(richUtilsLink));
  return "handled";
};


setSelection = (editorState) => {
  const selectionState = editorState.getSelection()

    const newSelection = selectionState.merge({
      hasFocus: true
    })
    return EditorState.forceSelection(editorState, newSelection);
}



navStyleToggle = (e) => {
      e.stopPropagation()
      const state = this.state
      const newEditorState = this.setSelection(this.state.editorState);
    //   debugger;
        
      if (!!e.currentTarget.dataset.name) {
          return this.onChange(newEditorState)
      }
      else if (!!e.currentTarget.dataset.block) {
        this.onChange(RichUtils.toggleBlockType(newEditorState, e.currentTarget.dataset.block))
        return "handled";
      }
        else {
        
            let testRich = RichUtils.toggleInlineStyle(newEditorState, e.currentTarget.dataset.inline)
        //   let self = this
        //   console.dir(RichUtils.toggleInlineStyle)
        // console.dir(RichUtils.toggleInlineStyle)
        // debugger;
        this.onChange(
            testRich
        );
            return "handled";

        }
    }


  handleSave = e => {
      e.stopPropagation()
    const newEditorState = this.setSelection(this.state.editorState);
    this.addBlockData(newEditorState)
  }


  handleBeforeInput = (chars, editorState) => {
    const selectionKey = this.state.editorState.getSelection().getStartKey()
    const contentState = this.state.editorState.getCurrentContent()
    const firstBlock = contentState.getFirstBlock()
    if(selectionKey === firstBlock.getKey()) {
        // console.log(firstBlock.getLength())
        if (firstBlock.getLength() >= 4) {
            const hasInlineStyle = !!editorState.getCurrentInlineStyle().size ? editorState.getCurrentInlineStyle() : false;
            const selection = this.state.editorState.getSelection()
            const addText = Modifier.insertText(contentState, selection, chars, hasInlineStyle)
            const conStateBlockData = Modifier.mergeBlockData(addText, addText.getSelectionAfter(), {title: addText.getFirstBlock().getText()})
            // debugger;
            const newState = EditorState.push(this.state.editorState, conStateBlockData, "change-block-data")

           this.onChange(newState) 
           return "handled"

        }
    }
    return "not-handled"
  }


  

  render() {
    //   debugger;
    //   console.log(convertToRaw(this.state.editorState.getCurrentContent()))
    return (
      <div style={styles.editor} className="editor-wrapper" data-name="editor-wrapper" onClick={this.navStyleToggle}>
      
       <Toolbar
    editorState={this.state.editorState}
    onToggle={this.navStyleToggle}
    onAddLink={this.onAddLink}
    />

    
        <Editor
          ref="editor"
          editorState={this.state.editorState}
          keyBindingFn={this.keyBindingFn}
          blockStyleFn={getBlockStyle}
          handleKeyCommand={this.handleKeyCommand}
          handleBeforeInput={this.handleBeforeInput}
          onChange={this.onChange}
          plugins={this.plugins}
          placeholder="Hello"
        />
        <button onClick={this.handleSave}>save</button>
      </div>
    );
  }
}

const styles = {
    editor: {
      border: '1px solid gray',
     minHeight: 'calc(100vh - 65px)',
     overflow: 'hidden'
    }
  };

  const mapStateToProps = state => {
      return ({
          currentPost: state.currentPost
      })
  }



export default connect(mapStateToProps, { addPost, updatePost })(BlogForm);