import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './components';

export function App() {
  return (
    <div className="App">
      {Home()}
    </div>
  );
}
