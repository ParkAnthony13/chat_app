import React, { useState, useEffect } from 'react';
import Chat from './components/Chat'
import io from 'socket.io-client';
import Home from './components/Home'
import {Router} from '@reach/router'
import './App.css';

function App() {

    const [nameState,setNameState] = useState({
        name:"",
        msg:""
    })

    return (
        <div className="App">
            <h1 style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"grey"}}>MERN CHAT</h1>
            <Router>
                <Home path="/" nameState={nameState} setNameState={setNameState}/>
                <Chat path="/chatroom" nameState={nameState} setNameState={setNameState}/>
            </Router>
        </div>
    );
}

export default App;