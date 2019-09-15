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
        newfaces.push(snap.val()[key].person)
      }
      console.log(newfaces)
      this.setState({facelist: newfaces});
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Home Watch</h1>
        <div className='container'>
          <Monitor
            type='People'
            source='http://192.168.0.160:8000/video_feed'
            video_width='400px'
            list={this.state.facelist}
          />
          <Monitor
            type='Licence Plates'
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
