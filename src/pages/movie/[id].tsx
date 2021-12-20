import Image from "next/image";
import Layout from "../../components/Layout";
import { GET_MOVIE_BY_ID } from "../../lib/graphql/queries";
import { Container } from "../../styles/movie.styles";
import { client } from "../../lib/apollo";

interface IPropsPostIdItem {
  movie: {
    title: string;
    overview: string;
    vote_average: number;
    poster_path: string;
  };
}

export default function PostIdItem({ movie }: IPropsPostIdItem) {
  return (
    <Layout>
      <Container>
        {movie && (
          <>
            <h1>{movie.title}</h1>
            <div>
              <Image
                src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="image movie"
                width={500}
                height={500}
              />
              <div>
                {movie.vote_average ? (
                  <p>
                    Nota: <span>{movie.vote_average}</span>
                  </p>
                ) : (
                  <p>
                    Nota: <span>Sem avaliação</span>
                  </p>
                )}
                <p>{movie.overview}</p>
              </div>
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data } = await client.query({
    query: GET_MOVIE_BY_ID,
    variables: {
      movieId: params.id,
    },
  });

  const movie = data.getMovieById;

  return {
    props: {
      movie: {
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
      },
    },
  };
}
