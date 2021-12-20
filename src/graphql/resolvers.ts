import { arg } from "nexus";
import { Context } from "./context";

export const resolvers = {
  Mutation: {
    //@ts-ignore
    createFavoriteMovie: async (_parent, args, ctx: Context) => {
      console.log(args);

      const results = await ctx.prisma.movies.create({
        data: {
          overview: args.input.overview,
          popularity: args.input.popularity,
          title: args.input.title,
          poster_path: args.input.poster_path,
          movie_favorite_id: args.input.movie_favorite_id,
          vote_average: args.input.vote_average,
        },
      });

      console.log(results);

      return {
        id: results.id,
        overview: results.overview,
        vote_average: results.vote_average,
        title: results.title,
        poster_path: results.poster_path,
      };
    },
  },
  Query: {
    //@ts-ignore
    getMovieById: async (_parent, args, ctx: Context) => {
      const results = await fetch(
        `${ctx.configs.base_url}/movie/${args.movieId}?api_key=${ctx.configs.api_key}&language=pt-BR`
      );

      const movie = await results.json();

      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        popularity: movie.popularity,
      };
    },

    //@ts-ignore
    getMoviesByName: async (_parent, args, ctx: Context) => {
      const response = await fetch(
        `${ctx.configs.base_url}/search/movie?api_key=${
          ctx.configs.api_key
        }&query=${args.name}&page=${args.page ? args.page : 1}&language=pt-BR`
      );

      const { results, page, total_pages } = (await response.json()) as any;

      return {
        results,
        page,
        total_pages,
      };
    },

    //@ts-ignore
    getAllTreddingMovies: async (_parent, args, ctx: Context) => {
      const res = await fetch(
        `${ctx.configs.base_url}/trending/all/week?api_key=${
          ctx.configs.api_key
        }&language=pt-BR&page=${args.page ? args.page : 1}`
      );

      const { results, page, total_pages } = (await res.json()) as any;

      return {
        results,
        page,
        total_pages,
      };
    },

    //@ts-ignore
    getFavoriteMovies: async (_parent, args, ctx: Context) => {
      const results = await ctx.prisma.movies.findMany();

      return results;
    },
  },
};
