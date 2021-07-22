import React, { useState, useEffect } from 'react';
import Chat from './components/Chat'
import io from 'socket.io-client';
import './App.css';

function App() {

    return (
        <div className="App">
            <h1>Socket Test</h1>
            <Chat/>
        </div>
    );
}

export default App;