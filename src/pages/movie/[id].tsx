import Image from "next/image";
import Layout from "../../components/Layout";
import { Container } from "../../styles/movie.styles";

export default function PostIdItem({
  movie,
}: {
  movie: {
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  };
}) {
  return (
    <Layout>
      <Container>
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
  const results = await fetch(`http://localhost:3000/api/movie/${params.id}`);

  const movie = await results.json();

  return {
    props: movie,
  };
}
