import { 
  configureStore, 
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import calcReducer from './calcReducer';
import productReducer from './productSlice';
import authReducer from './authSlice';


const rootReducer = combineReducers({
  calc: calcReducer,
  auth: authReducer,
  product: productReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'product/fetchProducts/fulfilled',
          'user/fetchUser/fulfilled',
          'product/fetchBadgeCount/fulfilled',
        ],
      },
    }),
});

