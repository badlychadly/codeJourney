import React, { Component } from 'react'
import DeleteIcon from './DeleteIcon'


export default class ImageModal extends Component {

    state = {
        images: [],
        idsToDelete: []
    }


    componentDidMount() {
        fetch('http://10.0.0.99:3001/api/cloud-images')
        .then(resp => resp.json())
        .then(images => {
            // debugger;
            this.setState({images: images.resources})
        })
    }

    addToDelete = e => {
        e.preventDefault()
        e.stopPropagation()
        // debugger;
        // console.log([...this.state.idsToDelete, e.target.dataset.id])
        this.setState({idsToDelete: [...this.state.idsToDelete, e.target.dataset.id]})
    }

    deleteItems = e => {
        e.preventDefault()
        e.stopPropagation()
        fetch('http://10.0.0.99:3001/api/cloud-images', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Accepts": "application/json" },
            body: JSON.stringify({public_ids: this.state.idsToDelete})
        })
        .then(resp => resp.json())
        .then(info => {
            let filteredState = this.state.images.filter(image => {
                return info.deleted[image.public_id] !== "deleted"
                }
            )
            this.setState({images: filteredState, idsToDelete: []})
            // debugger
        })
        .catch(err => console.log(err))
    }

    renderImages = () => {
        return !!this.state.images && this.state.images.map(image => {
            // debugger;
            return (
            <div key={image.url} className="image-card">
                {/* <img key={image.url} onClick={this.props.getImage} src={image.secure_url} style={{maxWidth: '100%', maxHeight: '100%', width: '200px', height: '200px', margin: '.2rem', cursor: 'pointer', display: 'inline-block'}} alt={image.url}/> */}

                <img key={image.url} className="image" onClick={this.props.getImage} src={image.secure_url} alt={image.url}/>
                <DeleteIcon public_id={image.public_id} addToDelete={this.addToDelete} />
                {/* <i  data-id={image.public_id} onClick={this.addToDelete} class="material-icons">delete</i> */}
            </div>
        )
        } 
    )
        
    }


    render() {
        // debugger;
        // console.log(this.state.idsToDelete)
        return (

            <>
                <div class="modal fade" style={{display: this.props.show ? 'flex' : 'none'}}id="exampleModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 style={{margin: '.2rem', width: '100%', textAlign: 'center', padding: '.2rem'}} class="modal-title" id="exampleModalLabel">Images from the Cloud</h4>
                                <button type="button" class="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                                    <i class="material-icons">clear</i>
                                </button>
                            </div>
                            <div className="modal-body-wrapper">
                                <div class="modal-body">
                                    {this.renderImages()}
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button style={{padding: '.3rem', backgroundColor: 'red', color: 'white', border: '1px solid transparent', borderRadius: '.25rem', margin: '.2rem', cursor: 'pointer'}} onClick={this.deleteItems}>Delete Selected</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}