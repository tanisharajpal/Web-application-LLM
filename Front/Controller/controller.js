"use client"

import { ChatAPI } from "@/api/ChatAPI";
import { AuthAPI } from "@/api/AuthAPI";
import { updateToken, removeToken } from "@/api/client";


export const initializeAuthentication = () => {
  const token = typeof window !== "undefined" ?
     window.sessionStorage.getItem('token') 
     : 
     "";
  return token? token : ""
}

export const AppController = (state, dispatch) => {
    const login = (username, password) => {
      AuthAPI.login(username, password).then((response) => {
        updateToken(response.token);
        dispatch({type: "setToken", payload: response.token})
      }).catch( error => {
        alert(error.response.data.detail);  
      });
    }

    const sigup = (username, password) => {
      AuthAPI.sigup(username, password).then((response) => {
        updateToken(response.token);
        dispatch({type: "setToken", payload: response.token})
      }).catch( error => {
        alert(error.response.data.detail);  
      });
    }

    const logout = () => {
      removeToken();
      dispatch({type: "setToken", payload: ""})
    }

    const getChats = () => {
        ChatAPI.getAll(state.token).then((response) => {
            dispatch({type: "setChats", payload: response})
            // Checkout if max amount of chats is reached
            // and show the last one (the first chat in the array)
            if(response.length >= 20) {
              const last_chat_id = response[0].id
              showChat(last_chat_id);
            }
        }).catch( error => {
          alert(error.response.data.detail);
          removeToken();
          dispatch({type: "setToken", payload: ""})
        });
    }

    const showChat = (id) => {
      ChatAPI.getMessages(state.token, id).then((response) => {
          dispatch({type: "setChatVisible", payload: id})
          dispatch({type: "setMessages", payload: response})
      }).catch( error => {
        alert(error.response.data.detail);  
      });
    }

    // Internal use
    const sendMessage = (message) => {
      _sendMessage(message, state.chatVisible);
    }

    const _sendMessage = (message, chat_id) => {
        if(state.messages.length >= 20) {
          alert("You have reached the maximum amount of messages on this chat, create a new one")
          return;
        }

        const originalList = state.messages;
        // const tmpMessages = [
        //       ...originalList,
        //     {
        //       id: state.messages.length + 1,
        //       user_message: message,
        //       bot_message: "thinking..."
        //     }
        // ]
        // dispatch({type: "setMessages", payload: tmpMessages})
        ChatAPI.postMessage(state.token, chat_id, message).then((response) => {
          const newMessages = [
            ...originalList,
            response,
          ]
          dispatch({type: "setMessages", payload: newMessages})
          // Look for the chat where the message was placed
          const index = state.chats.findIndex((chat) => chat.id === chat_id)
          // Verify that the chat exists, avoid raice condition
          // in "createChat" path
          if(index >= 0) {
            // Increse message amount and reload
            state.chats[index].amount += 1;
            dispatch({type: "setChats", payload: state.chats})
          }
          else {
            // If new chat was created, it is very possible
            // that the chats var is not updated yet
            // so we need to reload it all
            getChats();
          }
        }).catch( error => {
          // const newMessages = [
          //     ...originalList,
          //   {
          //     id: state.messages.length + 1,
          //     user_message: message,
          //     bot_message: "error..."
          //   }
          // ]
          // dispatch({type: "setMessages", payload: newMessages})
          alert("Error: " + error.response.data.detail)
        });
      };

    const createChat = (message) => {
      if(state.chats.length >= 20) {
        alert("You have reached the maximum amount of chats")
        return;
      }
      const chatName = `Chat ${message.substring(0,5)}`
      ChatAPI.createChat(state.token, chatName).then((response) => {
        const newChats = [
            response,  
            ...state.chats,
        ]
        dispatch({type: "setChats", payload: newChats})
        dispatch({type: "setChatVisible", payload: response.id})
        _sendMessage(message, response.id);
      }).catch( error => {
        alert("Error: " + error.response.data.detail)
      });
    }

    const newChat = () => {
      if(state.chats.length >= 20) {
        alert("You have reached the maximum amount of chats")
        return;
      }
      dispatch({type: "setMessages", payload: []})
      dispatch({type: "setChatVisible", payload: null})
    }

    const getChatName = () => {
      const index = state.chats.findIndex((chat) => chat.id === state.chatVisible)
      // Verify that the chat exists, avoid raice condition
      // in "createChat" path
      if(index >= 0) {
        return `${state.chats[index].name}:`;
      } else{
        return ":";
      }
    }

    return {
        login,
        sigup,
        logout,
        getChats,
        showChat,
        sendMessage,
        createChat,
        getChatName,
        newChat,
    }
}