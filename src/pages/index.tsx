import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Container, MoviesContainer } from "../styles/home.styles";
import Link from "next/link";
import { args } from "../configs/api";

interface IPropsComponent {
  list: any[];
}

export default function Home({ list }: IPropsComponent) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  async function handleSearchMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    return router.push(`/search/${search}`);
  }

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
        {list && list.length > 0 ? (
          <MoviesContainer>
            {list
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

/* ---------------Server Side Rendering--------------------------*/

// função que será executada ainda no lado do servidor onde os dados vai
// ser repassado para o component e tudo ainda sera executado no lado servidor
// Quando chegar no cliente só o componente será executado novamente, mas já com os dados.

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/trending");

  const { list } = (await res.json()) as any;

  return {
    props: {
      list,
    },
  };
}
