// graphql/schema.ts

import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type FavoriteMovies {
    id: String
    title: String
    overview: String
    poster_path: String
    vote_average: String
    popularity: String
  }

  type FavoriteMovies {
    id: String
    title: String
    overview: String
    poster_path: String
    vote_average: String
    popularity: String
  }

  type TypeMoviesResponse {
    results: [FavoriteMovies]!
    page: Float
    total_pages: Float
  }

  type Query {
    getAllTreddingMovies(page: Float!): TypeMoviesResponse!
    getMoviesByName(name: String, page: Float!): TypeMoviesResponse!
    getMovieById(movieId: String): FavoriteMovies!
    getFavoriteMovies: [FavoriteMovies]!
  }

  input InputCreateFavoriteMovies {
    title: String!
    overview: String!
    poster_path: String!
    vote_average: String!
    popularity: String!
    movie_favorite_id: String!
  }

  type Mutation {
    createFavoriteMovie(input: InputCreateFavoriteMovies): FavoriteMovies!
  }
`;
