import React, { Component } from 'react';
import './App.css';
import PostForm from './components/PostForm';
import PostKeras from './components/PostKeras';

class App extends Component {

  render() {
    return (
      <div>
        <PostForm /> 
        <PostKeras />
      </div>
    );
  }
}

export default App;
