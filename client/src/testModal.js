import React, { Component } from 'react'


export default class TestModal extends Component {

    // state = {
    //     show: false
    // }

    // toggle = () => {
    //     this.setState({show: !this.state.show})
    // }


    render() {
        return (
//             <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//   Launch demo modal
// </button>
            <>
    {/* <button className="header-btn" onClick={this.toggle} title="choose from existing">
    <i className="material-icons">photo_library</i>
    </button> */}

        <div class="modal fade" style={{display: this.props.show ? 'block' : 'none'}} id="exampleModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </>
        )
    }
}