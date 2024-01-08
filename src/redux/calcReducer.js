import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { 
  buyProduct, 
  fetchBadgeCount,
  fetchProductData,
  fetchProduct,
  fetchBasketData,
  addToBasketData,
  removeToBasket
} from '../api';


export const calcReducer = createSlice({
  name: 'calc',
  initialState: {
    sheetDimensions: {
      length: 3630,
      width: 1830,
    },
    cuts: [],
    loadingAddNewCutButton: false,
    products: [],
    product: {},
    basket: [],
    basketBadgeCount: 0,
    basketSelectedProduct: [],
    loading: true,
    loadingProduct: true,
    loadingBasket: false,
    loadingRemoveBasket: false,
    loadingBuyButton: false,
    error: null,
  },
  reducers: {
    addNewCut: (state, action) => {
      const newCut = action.payload;
      console.log('newCut', newCut);
      state.cuts = [...state.cuts, newCut];
    },
    changeBasketProductCount: (state, action) => {
      const { _id, isIncrement } = action.payload;
      const basket = state.basket;
      state.basketBadgeCount = isIncrement ? +state.basketBadgeCount + 1 : +state.basketBadgeCount -1
      state.basket = basket?.map((item) => {
        if(item.productID === _id) {
          return {
            ...item,
            count: isIncrement ? +item.count + 1 : +item.count -1,
          }
        }
        return item;
      })
    },
    changeBasketSelectedProduct: (state, action) => {
      const _id = action.payload;
      const basketSelectedProduct = state.basketSelectedProduct;
      if(!basketSelectedProduct.includes(_id)) {
        state.basketSelectedProduct = [...state.basketSelectedProduct, _id]
      }
      state.basketBadgeCount = +state.basketBadgeCount + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBadgeCountAsync.pending, state => {
        state.basketBadgeCount = 0;
      })
      .addCase(fetchBadgeCountAsync.fulfilled, (state, action) => {
        state.basketBadgeCount = action.payload.data?.badgeCount;
      })
      .addCase(fetchBadgeCountAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchProductsAsync.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductAsync.pending, state => {
        state.loadingProduct = true;
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.product = action.payload.data;
        state.loadingProduct = false;
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })

      .addCase(fetchBasketAsync.pending, state => {
        state.loadingBasket = true;
      })
      .addCase(fetchBasketAsync.fulfilled, (state, action) => {
        const data = action.payload.data;
        const basketSelectedProduct = []
        data.basket.forEach((item) => {
          if(!state.basketSelectedProduct.includes(item.productID)) {
            basketSelectedProduct.push(item.productID)
          }
        })
        state.basket = data.basket;
        state.loadingBasket = false;
        state.basketSelectedProduct = [...state.basketSelectedProduct, ...basketSelectedProduct]
      })
      .addCase(fetchBasketAsync.rejected, (state, action) => {
        state.loadingBasket = false;
        state.error = action.payload;
      })

      .addCase(removeFromBasketAsync.pending, state => {
        state.loadingRemoveBasket = true;
      })
      .addCase(removeFromBasketAsync.fulfilled, (state, action) => {
        const data = action.payload.data;        
        state.basket = state.basket.filter(item => item._id !== data._id);
        state.basketBadgeCount = state.basketBadgeCount - data.count;
        state.basketSelectedProduct = state.basketSelectedProduct.filter(id => id !== data.productID);
        state.loadingRemoveBasket = false;
      })
      .addCase(removeFromBasketAsync.rejected, (state, action) => {
        state.loadingRemoveBasket = false;
        state.error = action.payload;
      })

      .addCase(buyProductAsync.pending, state => {
        state.loadingBuyButton = true;
      })
      .addCase(buyProductAsync.fulfilled, (state, action) => {
        state.loadingBuyButton = false;
      })
      .addCase(buyProductAsync.rejected, (state, action) => {
        state.loadingBuyButton = false;
        state.error = action.payload;
      });
  },
});

export const fetchBadgeCountAsync = createAsyncThunk('product/fetchBadgeCount', async (_, thunkAPI) => {
  try {
    const response = await fetchBadgeCount();
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchProductsAsync = createAsyncThunk('product/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await fetchProductData();
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchProductAsync = createAsyncThunk('product/fetchProduct', async (id, thunkAPI) => {
  try {
    const response = await fetchProduct(id);
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchBasketAsync = createAsyncThunk('product/fetchBasket', async (_, thunkAPI) => {
  try {
    const response = await fetchBasketData();
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addToBasketAsync = createAsyncThunk('product/addToBasket', async (data, thunkAPI) => {
  try {
    const response = await addToBasketData(data);
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const removeFromBasketAsync = createAsyncThunk('product/removeToBasket', async (data, thunkAPI) => {
  try {
    const response = await removeToBasket(data);
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const buyProductAsync = createAsyncThunk('product/buyProduct', async (data, thunkAPI) => {
  try {
    const response = await buyProduct(data);
    window.location.href = response.data.url;
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const { 
  addNewCut, 
  changeBasketProductCount, 
  changeBasketSelectedProduct 
} = calcReducer.actions

export default calcReducer.reducer;







