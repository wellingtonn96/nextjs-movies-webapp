import { gql } from "@apollo/client";

export const CREATE_FAVORITE_MOVIE = gql`
  mutation createFavoriteMovie($input: InputCreateFavoriteMovies) {
    createFavoriteMovie(input: $input) {
      id
      overview
      vote_average
      title
      vote_average
      poster_path
    }
  }
`;
