import React from 'react';
import Sidebar from './features/components/Sidebar';
import Chat from './features/components/Chat';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
