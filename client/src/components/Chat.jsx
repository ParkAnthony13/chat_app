import React, {useState, useEffect} from "react"
import io from 'socket.io-client';


const Chat = props => {
    // notice that we pass a callback function to initialize the socket
    // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
    const [socket] = useState(() => io(':8000'));
    const[formState,setFormState] = useState("")
    const[messages,setMessages] = useState([]);


    useEffect(() => {
        // we need to set up all of our event listeners
        // in the useEffect callback function
        console.log('Is this running?');
        socket.on('Welcome', data => console.log(data));
        socket.on("new_message_from_server", msg => 
            setMessages(prevMessages => {
                return [msg, ...prevMessages];
        }))
        // note that we're returning a callback function
        
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, []);
    // socket on needs to be in useEffect to load when we open page
    // socket emits happen on events

    const handleSubmit = e => {
        e.preventDefault()
        socket.emit("event_from_client",formState) // received in server.js
        console.log("sent")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setFormState(e.target.value)}name="msg"/>
                <button type="submit">submit</button>
            </form>
            <div>
                {messages.map((message,idx) => {
                    return(
                        <p key={idx}>{message}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Chat