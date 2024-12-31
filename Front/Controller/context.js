"use client"

import { createContext, useReducer } from "react";
import { AppController, initializeAuthentication } from "./controller";

export const AppContext = createContext();


const initialState = {
    token: initializeAuthentication(),
    chats: [],
    messages: [],
    chatVisible: null,
  }

const AppReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "setToken":
        return {
          ...state,
          token: payload,
        };
      case "setChats":
        return {
          ...state,
          chats: payload,
        };
      case "setMessages":
        return {
          ...state,
          messages: payload,
        };
      case "setChatVisible":
        return {
          ...state,
          chatVisible: payload,
        };
 
      default:
        return state;
    }
  };

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // const setMessages = (messages) => {
  //   dispatch({type: "setMessages", payload: messages})
  // };

  const value = {
    state: state,
    dispatch: dispatch,
    AppController: AppController(state, dispatch),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

};