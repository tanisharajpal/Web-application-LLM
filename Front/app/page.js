"use client"

import { useEffect } from 'react'
import { useContext } from "react"
import { AppContext } from "../controller/context"
import { useRouter } from 'next/navigation';

import ChatList from "@/components/chat/ChatList"
import NavBar from "@/components/NavBar"
import ChatBody from "@/components/chat/ChatBody"


export default function Home() {
    const {state, AppController} = useContext(AppContext)
    const router = useRouter();

    useEffect(() => {
        if(!state.token) {
            router.push('/login')
        }
      }, [state.token])

    return (
    <div className="flex flex-col h-screen">
        <NavBar />
        <ChatList />
        <ChatBody />
    </div>

    )
}