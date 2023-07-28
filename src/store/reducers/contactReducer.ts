import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IOrigin {
  name: string;
  url: string;
}

interface ILocation {
  name: string;
  url: string;
}

interface IUser {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

interface ContactState {
  data: Array<IUser>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ContactState = {
  data: [],
  status: 'idle',
};

export const fetchData = createAsyncThunk('contact/fetchData', async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character'); // Replace with your API endpoint
  const data = await response.json();

  return data;
});

const contactSlice = createSlice({
  name: 'contactReducer',
  initialState,
  reducers: {
    doSomething: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.results;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { doSomething } = contactSlice.actions;
export default contactSlice.reducer;
