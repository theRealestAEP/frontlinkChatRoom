`use client`
import React, { useEffect, useState } from 'react';
import { Emitter, useSharedState } from 'frontlink';

export default function ChatRoom() {
    const [messages, setMessages] = useSharedState<string[]>("chatRoom", []);
    const [input, setInput] = useState("");

    // Send message function remains the same
    const sendMessage = () => {
        if (input.trim()) {
            // Use functional update for setting messages
            setMessages((currentMessages) => [...currentMessages, input]);
            setInput("");
        }
    };
    
    Emitter.on("message", (message: string) => {
        console.log(`Received message: ${message}`);
    });

    // useEffect(() => {
    //     const handleMessage = (message: string) => {
    //         try {
    //             console.log(`Received message: ${message}`)
    //             // Assuming the message is JSON formatted, parse it

    //             const data = JSON.parse(message);
    //             console.log("Received message:", data);
    //             // If the message is an object and contains a specific property, e.g., text
    //             if(data && data.text) {
    //                 setMessages((currentMessages) => [...currentMessages, data.text]);
    //             } else {
    //                 // Handle any other format or custom logic as needed
    //                 console.error("Message format is not as expected:", message);
    //             }
    //         } catch (e) {
    //             console.error("Error parsing message:", e);
    //         }
    //     };

    //     Emitter.on("message", handleMessage);

    //     return () => {
    //         Emitter.off("message", handleMessage);
    //     };
    // }, []); 

    return (
        <div>
            <h2>Chat Room</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
