'use client';
import { useSharedState, useSharedFunction } from "frontlink"
import { useEffect, useState } from "react"

export default function SomeSharedComponent() {
  const [messages, setMessages] = useState<string[]>([]) // local state
  const [curMessage, setCurMessage] = useState("") // local state
  const [value, setValue] = useSharedState("someRoomName", "my local value")
  const [userName, setUserName] = useState<null | string>(null);
  const [newUserName, setnewUserName] = useState("")

  const sharedFunc = useSharedFunction("sharedFunc", async (someArg: string) => {
    setMessages((prev) => [...prev, someArg])
  })

  useEffect(() => {
    setTimeout(() => {
      setUserName(''); // Assuming no userName is set yet
      //to fix hydration mismatch
    }, 0);
  }, []);

  if (userName === null) {
    return <div>Loading...</div> //to fix hydration mismatch
  } else if (userName === "") {
    return (
      <div className="flex justify-center items-center bg-gray-200">
        <div className="w-full max-w-7xl p-6 mt-10 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col h-96 border-b-2 border-gray-300 overflow-y-scroll">
            {/* Messages will go here */}
            <p>Welcome to the Room</p>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="flex items-end">
                  <p className="text-sm">{message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex">
            <input
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
              value={newUserName}
              onChange={(e) => {
                setnewUserName(e.target.value);
              }}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => {
                setUserName(newUserName); // this gets called on all clients
              }}
            >
              SET USER NAME
            </button>
          </div>
        </div>
      </div>
    );

  }
  if(userName != ""){
    return (
      <div className="flex justify-center items-center bg-gray-200">
        <div className="w-full max-w-7xl p-6 mt-10 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col h-96 border-b-2 border-gray-300 overflow-y-scroll">
            {/* Messages will go here */}
            <p>Welcome to the chat Room</p>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="flex items-end">
                  <p className="text-sm">{message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex">
            <input
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
              value={curMessage}
              onChange={(e) => {
                setCurMessage(e.target.value);
              }}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => {
                sharedFunc(`${userName}: ${curMessage}`); // this gets called on all clients
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}