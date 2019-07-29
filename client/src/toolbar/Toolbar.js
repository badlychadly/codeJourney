import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import BlockStyleBtns from "./BlockStyleBtns";
// import HeaderStyleDropdown from "./HeaderStyleDropdown";
import InlineStyleBtns from './InlineStyleBtns'

export const BLOCK_TYPES = [
	{ label: " “ ” ", style: "blockquote" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
	{ label: "{ }", style: "code-block" }
];

export const HEADER_TYPES = [
	{ label: "(None)", style: "unstyled" },
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" }
];

export function getBlockStyle(block) {
	// debugger;
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		case "unstyled":
			return "RichEditor-unstyled"
		case "atomic":
			return "RichEditor-atomic"
		default:
			return null;
	}
}

class BlockStyleToolbar extends React.Component {

	state = {
		hideHeaders: true,
		hideImgDropdown: true
	}

	handleMouseEnter = e => {
		if (!!e.currentTarget.dataset.imgDropdown) {
			return this.setState({hideImgDropdown: false})
		}
		if (!!e.currentTarget.dataset.headingDropdown) {
			return this.setState({hideHeaders: false})
		}
	}

	handleMouseLeave = e => {
		if (!!e.currentTarget.dataset.imgDropdown) {
			return this.setState({hideImgDropdown: true})
		}
		if (!!e.currentTarget.dataset.headingDropdown) {
			return this.setState({hideHeaders: true})
		}
	}

	render() {
		const { editorState } = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<div className="RichEditor-controls menu-inline-wrapper">
				{/* <div className="menu-inline-inner"> */}
				{/* <HeaderStyleDropdown
					headerOptions={HEADER_TYPES}
					active={blockType}
					onToggle={this.props.onToggle}
				/> */}

				<div onMouseEnter={this.handleMouseEnter} data-heading-dropdown="true" onMouseLeave={this.handleMouseLeave} style={{display: "inline-block", width: "100%"}}>
				<button className="menu-inline-btn">H</button>
				
					<div className="header-dropdown" hidden={this.state.hideHeaders} style={{position: "absolute", left: "40px", top: "0"}}>
					{HEADER_TYPES.map(heading => {
						// console.log(heading.value)
						return <button className="header-btn" data-block={heading.style} onClick={this.props.onToggle} key={heading.label}>{heading.label}</button>
					})}
				</div>

				
				</div>


				{BLOCK_TYPES.map(type => {
					return (
						<BlockStyleBtns
							active={type.style === blockType}
							label={type.label}
							onToggle={this.props.onToggle}
							style={type.style}
							key={type.label}
							type={type}
						/>
					);
				})}

				<InlineStyleBtns openInputFile={this.props.openInputFile} fileInput={this.props.fileInput} toggle={this.props.onToggle} onAddLink={this.props.onAddLink} onAddImage={this.props.onAddImage} />

				<div onMouseEnter={this.handleMouseEnter} data-img-dropdown="true" onMouseLeave={this.handleMouseLeave} style={{display: "inline-block", width: "100%"}}>
				<button onClick={this.props.openInputFile} className="menu-inline-btn">
					<i>IMG</i>
				</button>
				
					<div className="header-dropdown" hidden={this.state.hideImgDropdown} style={{position: "absolute", left: "40px", bottom: "0"}}>
						<button className="header-btn" data-block="url" onClick={this.props.openInputFile}>URL</button>
						<button className="header-btn" data-block="choose" onClick={this.props.openInputFile}>Choose</button>
					</div>
				</div>
				<input type="file" style={{display: "none"}} name="file" onChange={this.props.onAddImage} ref={this.props.fileInput}/>

				
			</div>
		);
	}
}

export default BlockStyleToolbar;