import { 
  configureStore, 
  combineReducers,
} from '@reduxjs/toolkit';
import calcReducer from './calcReducer';


const rootReducer = combineReducers({
  calc: calcReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

