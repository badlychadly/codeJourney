import React from 'react'

export default function SavingIcon({message, ...rest}) {

    const renderLetters = () => {
        // debugger
        console.log('render')
        return Array.prototype.map.call(message, letter => <div className="cascading-text__letter tx--red">{letter}</div>)
    }

    return (
        <div className="cascading-text cascading-text--fade" data-animated="data-animated">

            {/* <h1 style={{position: 'fixed', top: '50%', left: '50%'}}>Saving</h1> */}
            {/* <h1 className="neon" data-text="Neon">Saving</h1> */}

            {/* <div className="cascading-text__letter tx--red">S</div>
            <div className="cascading-text__letter tx--red">a</div>
            <div className="cascading-text__letter tx--red">v</div>
            <div className="cascading-text__letter tx--red">i</div>
            <div className="cascading-text__letter tx--red">n</div>
            <div className="cascading-text__letter tx--red">g</div> */}
            {renderLetters()}
        </div>
    )
}