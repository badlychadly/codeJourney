import React, { Component } from 'react'


export default class ImageModal extends Component {

    state = {
        images: []
    }


    componentDidMount() {
        fetch('http://10.0.0.99:3001/api/cloud-images')
        .then(resp => resp.json())
        .then(images => {
            // debugger;
            this.setState({images: images.resources})
        })
    }

    renderImages = () => {
        return !!this.state.images && this.state.images.map(image => {
            return (
            <div key={image.url} className="image-card">
                {/* <img key={image.url} onClick={this.props.getImage} src={image.secure_url} style={{maxWidth: '100%', maxHeight: '100%', width: '200px', height: '200px', margin: '.2rem', cursor: 'pointer', display: 'inline-block'}} alt={image.url}/> */}

                <img key={image.url} className="image" onClick={this.props.getImage} src={image.secure_url} alt={image.url}/>
            </div>
        )
        } 
    )
        
    }


    render() {
        return (

            <>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="my-example">
                    <div class="modal-body">
                        {this.renderImages()}
                    </div>

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