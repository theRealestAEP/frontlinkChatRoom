'use client';

import { FrontlinkProvider } from "frontlink";
import  Chatroom from "./components/Chatroom";
export default function Home() {
  return (
    <main>
      <FrontlinkProvider debugLog={true} api="wss:///backend.removegreenscreen.com:8081/ws">
        <Chatroom />
      </FrontlinkProvider>
    </main>
  );
}
