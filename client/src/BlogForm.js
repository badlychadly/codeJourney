import React from 'react'
import { connect } from 'react-redux'
import { addPost } from './actions/posts'


import {
	// Editor,
    EditorState,
    SelectionState,
    ContentState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    convertFromHTML,
    Modifier,
    getDefaultKeyBinding,
    DefaultDraftBlockRenderMap
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPluginPlugin from './plugins/addLinkPlugin'
import Toolbar, { getBlockStyle } from './toolbar/Toolbar'

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





class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    const convertedContent = convertFromRaw(rawBlock)

    this.state = {editorState: EditorState.createWithContent(convertedContent)};
    this.onChange = (editorState) => {

        const selectionKey = editorState.getSelection().getStartKey()
        const contentState = editorState.getCurrentContent()
        const firstBlock = contentState.getFirstBlock()
        if(editorState.getSelection().getStartKey() === firstBlock.getKey()) {
            if (firstBlock.getLength() > 0) {
                const entityKey = contentState.getLastCreatedEntityKey()
                const selection = editorState.getSelection()
                const conStateBlockData = Modifier.setBlockData(contentState, selection, {title: firstBlock.getText()})
                return this.setState({editorState: EditorState.push(editorState, conStateBlockData)})

            }
        }
        this.setState({editorState});
    }

    this.plugins = [
        highlightPlugin,
        addLinkPluginPlugin
       ];

    //    this.textInput = React.createRef();
  }


  moveSelectionToEnd = (editorState) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
  
    const key = blockMap.last().getKey();
    const length = blockMap.last().getLength();

  
    const selection = new SelectionState({
      anchorKey: key,
      anchorOffset: length,
      focusKey: key,
      focusOffset: length,
    });
  
    return EditorState.acceptSelection(editorState, selection);
  };


  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };


  onChange = editorState => {
    //   debugger;
    this.setState({
        editorState
    });
};

handleKeyCommand = command => {
  const testUtils = RichUtils
    const newState = RichUtils.handleKeyCommand(
        this.state.editorState,
        command
    );
    // debugger;
    if (command === "split-block") {
      const checkMod = Modifier.splitBlock(this.state.editorState.getCurrentContent(), this.state.editorState.getSelection())
      const newEState = EditorState.push(this.state.editorState, checkMod, command)
      this.onChange(RichUtils.toggleBlockType(newEState, 'unstyled'))
      return "handled"
    }
    if (newState) {
        this.onChange(newState);
        return "handled";
    }
    return "not-handled";
};

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
  this.onChange(this.setSelection(RichUtils.toggleLink(newEditorState, selection, entityKey)));
  return "handled";
};


setSelection = (editorState) => {
  const selectionState = editorState.getSelection()

    const newSelection = selectionState.merge({
      hasFocus: true
    })
    return EditorState.forceSelection(editorState, newSelection);
}

componentDidMount() {
//   const contentState = this.state.editorState.getCurrentContent();
//   const selectionState = this.state.editorState.getSelection();
//   const cState = convertFromRaw(myMap)
//   const rawInfo = convertToRaw(this.state.editorState.getCurrentContent())
//    const testMod = Modifier.setBlockType(contentState, selectionState, "header-one")
//   // debugger;
//    const testState = EditorState.push(this.state.editorState, testMod, "change-block-type")
//    const rawCon = convertToRaw(testState.getCurrentContent())
//    const editor = Editor
//    const rich = RichUtils
        const convert = convertToRaw
      const dMap = DefaultDraftBlockRenderMap
  //  debugger;
  // this.onChange(testState)
  
}




navStyleToggle = (e) => {
      e.stopPropagation()
      const newEditorState = this.setSelection(this.state.editorState);
      const m = Modifier
    //   debugger;

      if (!!e.currentTarget.dataset.name) {
          return this.onChange(newEditorState)
      }
      else if (!!e.currentTarget.dataset.block) {
        this.onChange(RichUtils.toggleBlockType(newEditorState, e.currentTarget.dataset.block))
      }
      else {
        this.onChange(
          RichUtils.toggleInlineStyle(newEditorState, e.currentTarget.dataset.inline)
      );

      }
}

  // keyBindingFn = (e) => {
  //   if (e.keycode === 13) {
  //     return 'unstyled'
  //   }
  //   return getDefaultKeyBinding(e)
  // }

  handleSave = e => {

  }

//   componentDidUpdate(prevProps, prevState) {
//     const currentContent = this.state.editorState.getCurrentContent()
//       const lastEntityK = currentContent.getLastCreatedEntityKey()
//       const selectionKey = this.state.editorState.getSelection().getStartKey()
//       const firstBlock = this.state.editorState.getCurrentContent().getFirstBlock()
//       if(selectionKey === firstBlock.getKey()) {
//         let newContent = currentContent.mergeEntityData(
//             "1", 
//             {title: currentContent.getFirstBlock().getText()}
//             )
//         this.onChange(EditorState.push(this.state.editorState, newContent, "apply-entity"))
//       }
//     //   console.log(this.state.editorState.getCurrentContent().getFirstBlock().getLength())
//       console.log(convertToRaw(this.state.editorState.getCurrentContent()))
//       console.log(this.state.editorState.getCurrentContent().getEntity("1"))
//   }


  

  render() {
    //   const rawInfo = convertToRaw(this.state.editorState.getCurrentContent())
      console.log(convertToRaw(this.state.editorState.getCurrentContent()))
    // debugger;
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
          // keyBindingFn={this.keyBindingFn}
          blockStyleFn={getBlockStyle}
          handleKeyCommand={this.handleKeyCommand}
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



export default connect(null, { addPost })(BlogForm);