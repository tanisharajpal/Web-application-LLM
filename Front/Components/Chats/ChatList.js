"use client";

import { useEffect } from 'react'
import { useContext } from "react"
import { AppContext } from "@/controller/context"



function ChatItem({id, name, amount}){
    const {state, AppController} = useContext(AppContext)

    const handleShowChat = (e) => {
        e.preventDefault();
        AppController.showChat(id);
    }

    return (
        <li className={state.chatVisible === id? "bg-slate-300": ""}>
            <a 
                href="#" 
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleShowChat}
            >
            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
            <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{amount}</span>
            </a>
        </li>
    )
}

export default function ChatList() {
    const {state, AppController} = useContext(AppContext)
    
    useEffect(() => {
        if(state.token) {
            AppController.getChats()
        }
      }, [state.token])

    const handleNewChat = (e) => {
        e.preventDefault();
        AppController.newChat();
    }

    return (

        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
            <li className="bg-black hover:bg-slate-400">
                <a 
                    href="#" 
                    className="flex items-center p-2 rounded-lg bg-black hover:bg-slate-400"
                    onClick={handleNewChat}
                >
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-black text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap hover:text-black text-white">New chat</span>
                </a>
            </li>
                {Array.isArray(state.chats)
                    ?
                    state.chats.map( chat => (
                        // <Unit props={unit} key={unit.uid} />
                        <ChatItem key={chat.id} id={chat.id} name={chat.name} amount={chat.amount}/>
                    ))
                    : null
                }
            </ul>
        </div>
        </aside>
    )
}