import React from 'react'
export const UseContext = React.createContext(null);
export const initialState = {
      isLoading: true,
      user: null
    }
export const authReducer =  (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_USER':
        return {
          ...prevState,
          user: action.data,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: action.data,
        };
      
      case 'LOGOUT':
        return {
          ...prevState,
          user: null
        };
    }
  }