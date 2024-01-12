import { createSlice } from '@reduxjs/toolkit'


export const calcReducer = createSlice({
  name: 'calc',
  initialState: {
    sheetDimensions: {
      width: 3630,
      height: 1830,
    },
    cuts: [],
  },
  reducers: {
    addNewCut: (state, action) => {
      const newCut = action.payload;
      state.cuts = [...state.cuts, newCut];
    },
    removeCut: (state, action) => {
      const id = action.payload;
      const cuts = state.cuts.filter(item => item.id !== id);
      state.cuts = cuts;
    },
    updateCut: (state, action) => {
      const cut = action.payload;
      const cuts = state.cuts.map(item => {
        if(item.id === cut.id) {
          return cut;
        }
        return item;
      });
      state.cuts = cuts;
    },
  },
  extraReducers: (builder) => {},
});


export const { 
  addNewCut,
  removeCut,
  updateCut,
} = calcReducer.actions

export default calcReducer.reducer;







