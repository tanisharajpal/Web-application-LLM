"use client";

import { useContext, useEffect } from "react"
import { AppContext } from "@/controller/context"

import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'



export default function ChatBody() {
    const {state, AppController} = useContext(AppContext)


    return (
        <div className="min-h-screen">
        <div className="flex flex-col h-full">
            <div className="p-4 sm:ml-64 mt-14 flex-1 gap-4 overflow-auto p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
            <ul className="space-y-2 font-medium">
                {!state.chatVisible?
                    <div>
                        <div> ** Welcome! New chat **:</div>
                        <div> Select a previous chat or start asking here</div>
                    </div>
                    :
                    <div>{AppController.getChatName()}</div>
                }
                {Array.isArray(state.messages)
                    ?
                    state.messages.map( (msg, i) => (
                        <li key={i}>
                            <ChatMessage user_message={msg.user_message} bot_message={msg.bot_message}/>
                        </li>
                    ))
                    : null
                }
                </ul>
            </div>
            <div className="p-4 sm:ml-64">
                <ChatInput />
            </div>
        </div>        
        </div>
    )
}
