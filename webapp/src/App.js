import React from 'react';
import './App.css';
import Monitor from './Monitor';

function App() {
  return (
    <div className="App">
      <h1>Home Watch</h1>
      <div className='container'>
        <Monitor 
          type='People'
          source='http://192.168.0.160:8000/video_feed'
          video_width='400px'
        />
        <Monitor 
          type='Licence Plates'
          source='http://192.168.0.160:8000/video_feed'
          video_width='400px'
        />
      </div>
      
    </div>  
  );
}

export default App;
