import { 
  configureStore, 
  combineReducers,
} from '@reduxjs/toolkit';
import calcSheetsReducer from './calcSheetsReducer';


const rootReducer = combineReducers({
  calcSheets: calcSheetsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

