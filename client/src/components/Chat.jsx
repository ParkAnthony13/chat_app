import React, { useState, useEffect, useRef } from "react"
import io from 'socket.io-client';

const Chat = props => {
    const { nameState, setNameState } = props
    const [socket] = useState(() => io(':8000'));
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false)


    const myMsg = {
        flex: "1",
        backgroundColor: "Navy",
        color: "white"
    }
    const otherMsg = {
        flex: "1",
        backgroundColor: "grey",
        color: "black"

    }

    useEffect(() => {
        // socket.on("new_message_from_server", msg => 
        //     setMessages(prevMessages => {
        //         return [...prevMessages,msg]; // messages is a list of dicts of name and msg
        // }))
        socket.on("new_message_from_server", msg => {
            setMessages(msg)
        })
        return () => socket.disconnect(true);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(nameState)
        setSending(!sending)
        socket.emit("event_from_client", nameState) // received in server.js
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{workWrap:"break-word",overflowY:"auto", display: "flex", flexDirection: "column", width: "40%", height: "500px", margin: "auto", outline: "2px solid black" }}>
                {messages.map((message, idx) => {
                    return (
                        <div>
                            {message.name == nameState.name
                                ? <div style={{ display: "flex" }}>
                                    <p style={{ flex: "2" }}></p>
                                    <p style={myMsg} key={idx}>{message.name}:{message.msg}</p>
                                </div>
                                : <div style={{ display: "flex" }}>
                                    <p style={otherMsg} key={idx}>{message.name}:{message.msg}</p>
                                    <p style={{ flex: "2" }}></p>
                                </div>}
                        </div>
                    )
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setNameState({ ...nameState, msg: e.target.value })} name="msg" />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Chat