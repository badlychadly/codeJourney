import React, { Component } from 'react'


export default class DeleteIcon extends Component {
    state = { selected: false}

    toggleSelected = e => {
        e.preventDefault()
        e.stopPropagation()
        if (!this.state.selected) {
           this.props.addToDelete(e) 
        }
        this.setState({selected: !this.state.selected})
    }

    render() {
        // debugger;
        return (
            <>
                {this.state.selected ? (
                    <i style={{color: '#007bff'}} onClick={this.toggleSelected} data-id={this.props.public_id} className="material-icons">check_circle</i>
                ) : (
                    <i style={{color: '#e85664'}} onClick={this.toggleSelected} data-id={this.props.public_id} className="material-icons">delete</i>
                )
        }
            </>
        )
    }
}