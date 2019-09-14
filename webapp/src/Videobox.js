import React from 'react'
import './Videobox.css'

function Videobox(props) {
    return (
        <div className='video'>
            <img src={props.source} style={{width: props.width}}/>
        </div>
    )
}

export default Videobox;