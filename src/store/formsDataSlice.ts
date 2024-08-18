import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputsData } from '../types';

export interface FormsState {
  formsCards: InputsData[];
}

const initialState: FormsState = {
  formsCards: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<InputsData>) => {
      state.formsCards.unshift(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;
export default formsSlice.reducer;
