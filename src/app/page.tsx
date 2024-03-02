'use client';

import { FrontlinkProvider } from "frontlink";
import  Chatroom from "./components/Chatroom";
export default function Home() {
  return (
    <main>
      <FrontlinkProvider debugLog={true} api="ws://localhost:8080/ws">
        <Chatroom />
      </FrontlinkProvider>
    </main>
  );
}
