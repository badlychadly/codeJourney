import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import BlockStyleBtns from "./BlockStyleBtns";
// import HeaderStyleDropdown from "./HeaderStyleDropdown";
import InlineStyleBtns from './InlineStyleBtns'
import TestModal from '../testModal'

export const BLOCK_TYPES = [
	{ label: "code", style: "blockquote", title: "code-block" },
	{ label: "format_list_bulleted", style: "unordered-list-item", title: "unordered-list" },
	{ label: "format_list_numbered", style: "ordered-list-item", title: "ordered-list" }
	// { label: "{ }", style: "code-block" }
];

export const HEADER_TYPES = [
	{ label: "looks_one", style: "header-one", title: "title-1" },
	{ label: "looks_two", style: "header-two", title: "title-2" },
	{ label: "looks_3", style: "header-three", title: "title-3" },
	{ label: "exposure_zero", style: "unstyled", title: "none" }
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
		hideImgDropdown: true,
		showModal: false
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

	toggleModal = e => {
		this.setState({showModal: !this.state.showModal})
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
				<button className="menu-inline-btn" title="format-size">
					<i class="material-icons">format_size</i>
				</button>
				
					<div className="header-dropdown" hidden={this.state.hideHeaders} style={{position: "absolute", left: "40px", top: "0"}}>
					{HEADER_TYPES.map(heading => {
						// console.log(heading.value)
						return <button className="header-btn" data-block={heading.style} title={heading.title} onClick={this.props.onToggle} key={heading.label}>
							<i class="material-icons">{heading.label}</i>
						</button>
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

				<InlineStyleBtns toggle={this.props.onToggle} onAddLink={this.props.onAddLink} onAddImage={this.props.onAddImage} />

				<div onMouseEnter={this.handleMouseEnter} data-img-dropdown="true" onMouseLeave={this.handleMouseLeave} style={{display: "inline-block", width: "100%"}}>
				<button onClick={this.props.openInputFile} title="add-image" className="menu-inline-btn">
				<i className="material-icons">image</i>
				</button>
				
					<div className="header-dropdown" hidden={this.state.hideImgDropdown} style={{position: "absolute", left: "40px", bottom: "0"}}>
						<button className="header-btn" data-block="url" title="use img link" onClick={this.props.openInputFile}>
							<i className="material-icons">attachment</i>
						</button>
						<button className="header-btn" data-block="choose" title="add new photo" onClick={this.props.openInputFile}>
							<i class="material-icons">wb_cloudy</i>
						</button>
						<button className="header-btn" onClick={this.toggleModal} title="choose from existing">
							<i className="material-icons">photo_library</i>
						</button>
					</div>
				</div>
				<input type="file" style={{display: "none"}} name="file" onChange={this.props.onAddImage} ref={this.props.fileInput}/>
				{ this.state.showModal &&
					< TestModal getImage={this.props.getImage} show={this.state.showModal} toggle={this.toggleModal} />
				}
				
			</div>
		);
	}
}

export default BlockStyleToolbar;