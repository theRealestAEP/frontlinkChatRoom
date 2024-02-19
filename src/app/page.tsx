'use client';

import { FrontlinkProvider } from "frontlink";
import  Chatroom from "./components/Chatroom";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FrontlinkProvider debugLog={true} api="ws://localhost:8080/ws">
        <Chatroom />
      </FrontlinkProvider>
    </main>
  );
}
