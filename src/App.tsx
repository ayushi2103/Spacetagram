import React from 'react';
import { ImageGallery } from './ImageGallery'
import { SOL_DATE } from './constants'
import './App.css';

function App() {
  return (
    <div>
      <ImageGallery sol={SOL_DATE}/>
    </div>
  );
}

export default App;
