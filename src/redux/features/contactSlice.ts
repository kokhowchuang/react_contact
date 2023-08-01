import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contactApi } from '../services/contactApi';

interface PageState {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

interface OriginState {
  name: string;
  url: string;
}

interface LocationState {
  name: string;
  url: string;
}

export interface EpisodeState {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
  url: string;
  created: string;
}

export interface CharacterState {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginState;
  location: LocationState;
  image: string;
  episode: string[];
  episode_info: Array<EpisodeState>;
  url: string;
  created: string;
}

export interface ContactState {
  info: PageState | null;
  results: Array<CharacterState>;
  selectedCharacter: CharacterState | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ContactState = {
  info: null,
  results: [],
  selectedCharacter: null,
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
    reset: () => initialState,
    selectContact(state, action: PayloadAction<number>) {
      const selectedUser = state.results.find(
        (item) => item.id === action.payload
      );
      if (selectedUser) {
        state.selectedCharacter = selectedUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      contactApi.endpoints.getCharacters.matchFulfilled,
      (state, { payload }) => {
        state.results = payload.results;
      }
    );
    builder.addMatcher(
      contactApi.endpoints.getSingleCharacter.matchFulfilled,
      (state, { payload }) => {
        state.selectedCharacter = payload;
      }
    );
  },
});

export const { reset, selectContact } = contactSlice.actions;
export default contactSlice.reducer;
