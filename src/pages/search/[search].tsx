import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Container, MoviesContainer } from "../../styles/home.styles";
import Link from "next/link";
import { args } from "../../configs/api";

interface IPropsComponent {
  results: any[];
}
export default function Home({ results }: IPropsComponent) {
  const router = useRouter();
  // const [data, setData] = useState(results);
  const [search, setSearch] = useState("");

  async function handleSearchMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push({
      pathname: `/search/${search}`,
    });
  }

  // useEffect(() => {
  //   setData(results);
  // }, [results]);

  return (
    <Layout>
      <Container>
        <h1>Filmes em destaque</h1>
        <form onSubmit={handleSearchMovie}>
          <input
            type="text"
            placeholder="Procure por um filme, série..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </form>
        {results && results.length > 0 ? (
          <MoviesContainer>
            {results
              .filter((item) => item.title !== undefined)
              .map((item, index) => (
                <div key={index}>
                  <Link href={`/movie/${item.id}`}>
                    <a>
                      <Image
                        src={`http://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt="Landscape picture"
                        width={200}
                        height={270}
                      />
                      <p>{item.title}</p>
                    </a>
                  </Link>
                </div>
              ))}
          </MoviesContainer>
        ) : (
          <p>Nenhum filme encontrado</p>
        )}
      </Container>
    </Layout>
  );
}
export async function getServerSideProps({
  params,
}: {
  params: {
    search: string;
  };
}) {
  const response = await fetch(
    `${args.base_url}/search/movie?api_key=${args.api_key}&language=pt-BR&query=${params.search}`
  );

  const list = await response.json();

  return {
    props: list,
  };
}
