import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUpload from './components/ImageUpload';
import EcoScoreButton from './components/EcoScoreButton';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Foodprint, the app that let's you know the eco-score of your meal!</h1>
      <ImageUpload/>
    </div>
  );
}

export default App;
