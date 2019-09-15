import React from 'react';
import './Monitor.css';
import Videobox from './Videobox';

class Monitor extends React.Component {
    constructor(props) {
        super(props);
        // type, source, firebase, video_width, list
    }

    render() {
        return (
            <div className='monitor'>
                <h2>{this.props.type}</h2>
                <Videobox source={this.props.source} width={this.props.video_width} />
                <h3>Recent</h3>
                <table>
                    <th>Recognized</th>
                    <th>Date and Time</th>
                    {
                        this.props.list.map(val => {
                            if (this.props.type == 'PEOPLE') {
                                return <tr><td>{val.person}</td><td>{val.time}</td></tr>
                            } else {
                                return <tr><td>{val.plate}</td><td>{val.time}</td></tr>
                            }
                            
                        })
                    }
                </table>
                {/* <ul>
                    {
                        this.props.list.map(val => {
                            return <tr><td>{val.person}</td><td>{val.time}</td></tr>
                        })
                    }
                </ul> */}
            </div>
        )
    }
}

export default Monitor;