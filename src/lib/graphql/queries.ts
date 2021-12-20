import { gql } from "@apollo/client";

export const GET_MOVIE_BY_ID = gql`
  query ($movieId: String) {
    getMovieById(movieId: $movieId) {
      id
      overview
      popularity
      poster_path
      vote_average
      title
    }
  }
`;

export const GET_MOVIES_BY_NAME = gql`
  query ($page: Float!, $name: String!) {
    getMoviesByName(name: $name, page: $page) {
      page
      total_pages
      results {
        id
        overview
        popularity
        poster_path
        title
        vote_average
      }
    }
  }
`;

export const GET_ALL_TRENDING_MOVIES = gql`
  query ($page: Float!) {
    getAllTreddingMovies(page: $page) {
      results {
        id
        overview
        popularity
        poster_path
        title
        vote_average
      }
      page
      total_pages
    }
  }
`;

export const GET_FAVORITES_MOVIES = gql`
  {
    getFavoriteMovies {
      id
      overview
      poster_path
      popularity
      poster_path
      title
    }
  }
`;
