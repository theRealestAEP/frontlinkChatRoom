`use client`
import React, { useEffect, useState } from 'react';
import { Emitter, Events, useSharedState } from 'frontlink';

export default function ChatRoom() {
    const [messages, setMessages] = useSharedState<string>("chatRoom", ""); //make CRoom dynamic 
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]); //new state to save the existing messages
    // Send message function remains the same 

    //make change so that if new user joins the room and sends a message, it doesnt override the existing messages of other users
    //need to write existing messages to some local state to save them or give the new user the existing messages 
    //or both - maybe some DB to save the messages and then give the new user the existing messages? 

    const sendMessage = () => {
        if (input.trim()) {
            setMessages(input);
            setHistory((history) => [...history, input])
            setInput("");
            // setHistory((history) => { [...h.istory, input] }); //save the message to the history state
        }
    };

    useEffect(() => {
        Emitter.on(Events.MessageReceived, (message: string) => {
            console.log(`Received message: ${message}`);
            setHistory((history) => [...history, message]); // Fix: Return the updated state
            console.log(message)
        });

    }, []);
    // Emitter.on(
    //     EventTypes.RoommateSubscribe,
    //     (msg: Messages.RoommateSubscribedMessage) => {
    //       // Present
    //     }
    //   )
    useEffect(() => {
        Emitter.on(Events.MessageEmitted, (message: string) => {
            console.log(`Sent message: ${message}`);
            console.log(message)
            // setHistory((history) => [...history, message]); // Fix: Return the updated state
        });

    }, [])

    return (
        <div>
            <h2>Chat Room</h2>
            <div className="flex-col justify-around">
                {history.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input className="border-2 border-gray-300"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
