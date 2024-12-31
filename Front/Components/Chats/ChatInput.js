"use client";

import { useState } from 'react'
import { useContext } from "react"
import { AppContext } from "@/controller/context"

export default function ChatInput() {
    const [characterCount, setCharacterCount] = useState(0);
    const handleChange = (event) => {
        const text = event.target.value;
        setCharacterCount(text.length);
      };

    const {state, AppController} = useContext(AppContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const message = data.get('inputMessage');
        if(message.length > 0) {
            if(!state.chatVisible) {
                AppController.createChat(message);
            }
            else {
                AppController.sendMessage(message);
            }
            document.getElementById("inputMessage").value = "";
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea
                    id="inputMessage"
                    name="inputMessage"
                    rows="2" 
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."
                    maxLength={2000} 
                    onChange={handleChange}>
                </textarea>
                <div>
                    {characterCount}/2000
                </div>
                <button 
                    type="submit" 
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"

                >
                    <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    )
}