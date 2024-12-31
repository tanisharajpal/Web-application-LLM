"use client";
import { useState } from "react"

export default function ChatMessage({user_message, bot_message}){
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="user photo" />
                <textarea 
                    rows="2"
                    className="block p-2.5 w-full text-sm text-white bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={user_message}
                    disabled
                >
                </textarea>
            </div>
            <div>
                <textarea 
                    rows="2"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={bot_message}
                    disabled
                >
                </textarea>
            </div>
        </div>

    )
}