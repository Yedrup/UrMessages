import { createContext, useReducer } from 'react';

export const UIStateContext = createContext();
export const UIDispatchContext = createContext();

// The difference between isLoading and isBusy is that isBusy is dedicated to user interaction remaining on the same page, submitting form for example. isLoading a bit less specific and can be used when navigating and display something on the whole page
const initialUiState = {
  isLoading: false,
  isBusy: false,
  isError: false,
  errorMessage: 'Something went wrong',
};

export const UIReducer = (state, action) => {
  // console.log('STATE UI -------- ACTION🔵', { state, action });

  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isBusy: true,
        errorMessage: initialUiState.errorMessage,
      };

    case 'END_LOADING':
      return {
        ...state,
        isLoading: false,
        isBusy: false,
      };

    case 'START_BUSY':
      return {
        ...state,
        isBusy: true,
      };

    case 'END_BUSY':
      return {
        ...state,
        isBusy: false,
      };

    case 'IS_ERROR':
      return {
        ...state,
        errorMessage: action.payload.customMessage,
        isLoading: false,
        isBusy: false,
        isError: true,
      };

    // we reset the state
    case 'IS_SUCCESS':
      return {
        ...state,
        ...initialUiState,
      };
    default:
      return { state, ...initialUiState };
  }
};

const UIProvider = ({ children }) => {
  const [stateUI, dispatchUI] = useReducer(UIReducer, initialUiState);
  return (
    <UIStateContext.Provider value={{ stateUI }}>
      <UIDispatchContext.Provider value={{ dispatchUI }}>
        {children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  );
};

export default UIProvider;
