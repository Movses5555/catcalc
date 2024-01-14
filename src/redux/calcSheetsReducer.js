import { createSlice } from '@reduxjs/toolkit'


export const calcSheetsReducer = createSlice({
  name: 'calcSheets',
  initialState: {
    sheetDimensions: {
      width: 3630,
      height: 1830,
    },
    cattingSheetsCount: 1,
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
    updateCattingSheetsCount: (state, action) => {
      const count = action.payload;
      state.cattingSheetsCount = count;
    },
  }
});


export const { 
  addNewCut,
  removeCut,
  updateCut,
  updateCattingSheetsCount,
} = calcSheetsReducer.actions

export default calcSheetsReducer.reducer;







