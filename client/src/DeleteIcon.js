import React, { Component } from 'react'


export default class DeleteIcon extends Component {
    state = { selected: false}

    toggleSelected = e => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({selected: !this.state.selected})
    }

    render() {
        // debugger;
        return (
            <>
                {this.state.selected ? (
                    <i onClick={this.toggleSelected} data-id={this.props.public_id} class="material-icons">check_circle</i>
                ) : (
                    <i onClick={this.toggleSelected} data-id={this.props.public_id} class="material-icons">delete</i>
                )
        }
            </>
        )
    }
}