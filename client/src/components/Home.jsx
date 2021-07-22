import { navigate } from "@reach/router";
import React, {useState, useEffect} from "react"
import io from 'socket.io-client';

const Home = props => {
    const [socket] = useState(() => io(':8000'));
    const{nameState,setNameState} = props

    const handleChange = e => {
        setNameState({
            ...nameState,
            name:e.target.value,
            msg:`${nameState.name} has just joined the Chatroom`
        })
        console.log(nameState)
    }

    const handleSubmit = e => {
        e.preventDefault()
        socket.emit("event_from_client",nameState)
        navigate('/chatroom')
    }

    return(
        <div>
            <h2>Get Started Right now!</h2>
            <p>I want to start chatting with the name...</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="myName" onChange={handleChange} type="text"/>
                    <input type="submit" value="Start Chatting"/>
                </form>
            </div>
        </div>
    )
}

export default Home