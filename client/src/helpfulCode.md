<!-- HAVING ENTITY WITH EDITORSTATE.createWithContent -->
<!-- still need to use addEntity() over applyEntity() -->

const rawBlock = {
  "entityMap": {
    "0": {
        "type": "TITLE",
        "mutability": "MUTABLE",
        "data": {
         "title": ""
        }
       }
  },
  "blocks": [
      {
          "key": "5h45l",
          "text": "",
          "type": "header-one",
          "depth": 0,
          "entityRanges": [
            {
             "offset": 0,
             "length": 0,
             "key": "0"
            }
           ],
          "inlineStyleRanges": [],
          "data": {title: ""}
      }
  ]
}
const convertedContent = convertFromRaw(rawBlock)

this.state = {editorState: EditorState.createWithContent(convertedContent)};


const selectionKey = editorState.getSelection().getStartKey()
        const contentState = editorState.getCurrentContent()
        const firstBlock = contentState.getFirstBlock()
        if(editorState.getSelection().getStartKey() === firstBlock.getKey()) {
            if (firstBlock.getLength() > 0) {


                const newSelection = selection.merge({anchorOffset: 0, focusOffset: firstBlock.getLength()})
                const entity = contentState.getEntity(entityKey)
                const conStateEntityData = contentState.replaceEntityData("1", {title: firstBlock.getText()})

                let contentWithTitle = Modifier.applyEntity(
                    conStateEntityData,
                    newSelection,
                    entityKey
                )
                const fixSelection = selection.merge({anchorOffset: firstBlock.getLength(), focusOffset: firstBlock.getLength()})
                const newEditorState = EditorState.push(editorState, contentWithTitle, "insert-characters")
                const changeSelectionEditorState = EditorState.forceSelection(newEditorState, fixSelection)

                return this.setState({editorState: changeSelectionEditorState})
            }
