import React from 'react'


export default function InlineStyleToolbar(props) {

    return (
        <>
          <button className="menu-inline-btn underline" data-inline="UNDERLINE" title="underline" onClick={props.toggle}>
            <i class="material-icons">format_underlined</i>
        </button>
        <button className="menu-inline-btn bold" data-inline="BOLD" title="bold" onClick={props.toggle}>
          <i class="material-icons">format_bold</i>
        </button>
        <button className="menu-inline-btn italic" data-inline="ITALIC" title="italic" onClick={props.toggle}>
          <i class="material-icons">format_italic</i>
        </button>
        <button className="menu-inline-btn strikethrough" data-inline="STRIKETHROUGH" title="strikethrough" onClick={props.toggle}>
          <i class="material-icons">strikethrough_s</i>
        </button>
        <button className="menu-inline-btn highlight" data-inline="HIGHLIGHT" title="inline-code" onClick={props.toggle}>
          <i class="material-icons">highlight</i>
        </button>
        <button id="link_url" onClick={props.onAddLink} title="link" className="menu-inline-btn">
          <i className="material-icons">insert_link</i>
        </button>
        
    </>
    )
} 