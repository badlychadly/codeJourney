import React, { Component } from 'react'
import { connect } from 'react-redux'

class SavingIcon extends Component {

   renderLetters = () => {
        // debugger
        console.log('render')
        // let className = this.props.saved ? "" : "cascading-text__letter";
        return this.props.saved ? (<div className="cascading-text__letter">{this.props.message}</div>) :  Array.prototype.map.call(this.props.message, (letter, index) => <div key={index} className="cascading-text__letter">{letter}</div>)
    }

    render() {
        const addClass = this.props.saved ? "pulse" : "fade";
        return this.props.isSaving ? (
            <div className={`cascading-text cascading-text--${addClass}`}>
                {this.renderLetters()}
            </div>
        ) :
        ("")
        // return (
        //     <div className={`cascading-text cascading-text--${addClass}`}>
        //         {this.renderLetters()}
        //     </div>
        // )

    }
}

const mapStateToProps = state => {
    return {
        isSaving: state.ui.isSaving,
        saved: state.ui.saveSuccess,
        message: state.ui.message
    }
}

export default connect(mapStateToProps, null)(SavingIcon)