import React from 'react';
import './App.css';

const App = () => {
  return (
    <div>
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
      />
    </div>
  );
}

export default App;
