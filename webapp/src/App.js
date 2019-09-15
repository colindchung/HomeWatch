import React from 'react';
import './App.css';
import Monitor from './Monitor';
import firebase from 'firebase';
import { config } from './config';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(config);
    this.dbface = this.app.database().ref().child('/people');

    this.state = {
      facelist: [],
      platelist: []
    }
  }

  componentDidMount() {
    console.log('mounting')
    this.dbface.on('value', snap => {
      var newfaces = []
      for (var key in snap.val()) {
        newfaces.push(snap.val()[key].person + ' | ' + snap.val()[key].time)
      }
      console.log(newfaces)
      this.setState({facelist: newfaces});
    });
  }

  render() {
    return (
      <div className="App">
        <h1>HOME WATCH</h1>

        <svg width="318px" height="126px" viewBox="0 0 318 126" version="1.1">
            <defs>
                <linearGradient x1="20.8184975%" y1="45.4187578%" x2="97.5467305%" y2="53.8845975%" id="linearGradient-1">
                    <stop stop-color="#009DFF" offset="0%"></stop>
                    <stop stop-color="#1E00FF" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Custom-Preset-2" transform="translate(-97.000000, -299.000000)">
                    <g id="Group" transform="translate(97.000000, 299.000000)">
                        <path d="M0,66.0553996 C105.798747,-22.0184665 208.716877,-22.0184665 308.754388,66.0553996 C345.169225,98.1153288 269.891684,126 155.309675,126 C85.0091669,126 33.2392752,106.018467 0,66.0553996 Z" id="Path-2" fill="url(#linearGradient-1)"></path>
                        <circle id="Oval" stroke="#FFFFFF" stroke-width="3" cx="160" cy="64" r="49"></circle>
                        <path d="M132.998521,65.3389902 L132.998521,94 C132.998521,94.5522847 133.446236,95 133.998521,95 L186.707558,95 C187.259843,95 187.707558,94.5522847 187.707558,94 L187.707558,63.7691866 C187.707558,63.2197766 188.150796,62.7732612 188.700191,62.7692137 L193.050412,62.737165 C193.602682,62.7330964 194.047087,62.282095 194.043018,61.7298252 C194.041476,61.5204877 193.974275,61.3169128 193.850889,61.1477961 L187.707558,52.7275593 L187.707558,52.7275593 L187.707558,38.253555 C187.707558,37.7012703 187.259843,37.253555 186.707558,37.253555 L178.02627,37.253555 C177.473985,37.253555 177.02627,37.7012703 177.02627,38.253555 L177.02627,42.2615176 C177.02627,42.8138024 176.578554,43.2615176 176.02627,43.2615176 C175.770591,43.2615176 175.524624,43.1635836 175.338918,42.9878425 L174.495271,42.1894641 L174.495271,42.1894641 L161.243336,29.6486033 C160.85855,29.2844643 160.256548,29.2836009 159.870719,29.6466345 L124.836815,62.6106966 C124.434589,62.9891581 124.415325,63.62203 124.793786,64.0242554 C124.982767,64.2251024 125.246302,64.3389902 125.52208,64.3389902 L131.998521,64.3389902 C132.550806,64.3389902 132.998521,64.7867055 132.998521,65.3389902 Z" id="Path-3" stroke="#FFFFFF" stroke-width="3"></path>
                    </g>
                </g>
            </g>
        </svg>

        <div className='container'>
          <Monitor
            type='PEOPLE'
            source='http://192.168.0.160:8000/video_feed'
            video_width='400px'
            list={this.state.facelist}
          />
          <Monitor
            type='LICENCE PLATES'
            source='http://192.168.0.160:8000/video_feed'
            video_width='400px'
            list={this.state.facelist}
          />
        </div>

      </div>
    );
  }

}

export default App;
