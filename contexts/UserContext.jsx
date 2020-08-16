import { createContext, useReducer } from 'react';
// This allows to display differently the App depending the user connection logic.
export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

const initialUserState = {
  isConnected: false,
  userId: null,
};

export const UserReducer = (state, action) => {
  // console.log('STATE USER -------- ACTION🔵', { state, action });
  switch (action.type) {
    case 'USER_CONNECTION':
      return {
        userId: action.payload?.user?.userId,
        isConnected: true,
      };
    case 'USER_DISCONNECTION':
      return {
        userId: null,
        isConnected: false,
      };
    default:
      return { ...state };
  }
};

const UserProvider = ({ children }) => {
  const [stateUser, dispatchUser] = useReducer(UserReducer, initialUserState);
  return (
    <UserStateContext.Provider value={{ stateUser }}>
      <UserDispatchContext.Provider value={{ dispatchUser }}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
