import React from 'react';
import './Monitor.css';
import Videobox from './Videobox';

class Monitor extends React.Component {
    constructor(props) {
        super(props);
        // type, source, firebase, video_width, 

        this.state = {
            list: [1,2,3,4,5]
        }
    }

    render() {
        return (
            <div className='monitor'>
                <h2>{this.props.type}</h2>
                <Videobox source={this.props.source} width={this.props.video_width} />
                <h3>Recent</h3>
                <ul>
                    {
                        this.state.list.map(val => {
                            return <li>{val}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Monitor;