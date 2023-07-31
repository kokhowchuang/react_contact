import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  CharacterState,
  ContactState,
  EpisodeState,
} from '../../redux/features/contactSlice';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ContactState,
      {
        page: string;
        status: string;
        gender: string;
        name: string;
      }
    >({
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        const query = [];

        if (arg.status) {
          query.push('status=' + arg.status.toLowerCase());
        }
        if (arg.page) {
          query.push('page=' + arg.page);
        }
        if (arg.gender) {
          query.push('gender=' + arg.gender);
        }

        const queryString = query.length > 0 ? '/?' + query.join('&') : '';
        const result = await baseQuery(`/character${queryString}`);

        return result.data
          ? { data: result.data as ContactState }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
    getSingleCharacter: builder.query<
      CharacterState,
      { id: string | undefined }
    >({
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        const result = await baseQuery(`/character/${arg.id}`);

        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }

        const character = result.data as CharacterState;
        const episodeList: string[] = [];

        character.episode.map((item: any) => {
          const parts = item.split('/');
          const episodeCode = parts[parts.length - 1];

          episodeList.push(episodeCode);
        });

        const episodeResult = await baseQuery(
          `/episode/${episodeList.join(',')}`
        );

        character.episode = episodeResult.data as EpisodeState[];

        return { data: result.data as CharacterState };
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetSingleCharacterQuery } = contactApi;
