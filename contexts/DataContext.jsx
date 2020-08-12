import React, { createContext, useReducer } from 'react';
import { isObject } from '../lib/utils/utils';

export const DataStateContext = createContext();
export const DataDispatchContext = createContext();
export const initialDataState = {
  isStoreInit: false,
  public: {
    isInit: false,
    messages: [],
    threads: [],
  },
  private: {
    isInit: false,
    messages: [],
    threads: [],
  },
};

export const DataReducer = (state, action) => {
  // console.log('🔵STATE DATA -------- BEFORE MODIFICATION', { state });
  // console.log('🔵STATE DATA -------- TYPE 🔹 ', action.type);
  // console.log('🔵STATE DATA ---- PAYLOAD  ✉️', action.payload);

  switch (action.type) {
    case 'INITIALIZE_ALL_LISTS_TYPES':
      let { payload } = action;

      let updatedState = Object.entries(state).reduce((acc, curr) => {
        const [nameStateProp, nameStateVal] = curr;
        // If not a list return it as it is
        if (!isObject(nameStateVal)) {
          return { ...acc, [nameStateProp]: nameStateVal };
        }
        // Return the current list if already init
        if (state[nameStateProp].isInit) {
          let updated = { [nameStateProp]: { ...state[nameStateProp] } };
          return { ...updated };
        }
        // Need to be init in store
        return {
          ...acc,
          [nameStateProp]: {
            isInit: true,
            ...payload[nameStateProp],
          },
        };
      }, {});

      return {
        ...state,
        ...updatedState,
        isStoreInit: true,
      };

    case 'INIT_LIST':
      return {
        ...state,
        [action.payload.type]: {
          isInit: true,
          ...action.payload.messages,
        },
      };

    case 'UPDATE_LIST':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          ...action.payload.messages,
        },
      };

    case 'CREATE_MESSAGE':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          ...action.payload.result,
          isInit: true,
        },
      };

    default:
      return state;
  }
};

const DataStateConsumer = DataStateContext.Consumer;
const DataDispatchConsumer = DataDispatchContext.Consumer;
export { DataDispatchConsumer, DataStateConsumer };

const DataProvider = ({ children }) => {
  const [stateData, dispatchData] = useReducer(DataReducer, initialDataState);
  return (
    <DataStateContext.Provider value={{ stateData }}>
      <DataDispatchContext.Provider value={{ dispatchData }}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

export default DataProvider;
