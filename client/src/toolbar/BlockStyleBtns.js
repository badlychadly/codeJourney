import React from "react";

class BlockStyleButton extends React.Component {
	

	render() {
		// debugger;
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}

		return (
			<button data-block={this.props.style} title={this.props.type.title} className={`${className} menu-inline-btn`} onClick={this.props.onToggle}>
				<i class="material-icons">{this.props.label}</i>
			</button>
		);
	}
}

export default BlockStyleButton;