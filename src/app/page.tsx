'use client';

import { FrontlinkProvider } from "frontlink";
import  Chatroom from "./components/Chatroom";
export default function Home() {
  return (
    <main>
      <FrontlinkProvider debugLog={true} api="ws://138.197.28.133:8081/ws">
        <Chatroom />
      </FrontlinkProvider>
    </main>
  );
}
