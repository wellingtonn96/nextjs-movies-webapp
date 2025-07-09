import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { Container, MoviesContainer } from "../styles/home.styles";
import React from "react";
import Link from "next/link";
import { args } from "../configs/api";

interface IPropsComponent {
  list: any[];
  page: number;
  total_pages: number;
}

export default function Home({ list, page, total_pages }: IPropsComponent) {
  const router = useRouter();

  // const classes = useStyles();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    return router.push(`/?page=${value}`);
  };

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
        <Pagination
          total_pages={total_pages}
          page={page}
          handleChange={handleChange}
        />
      </Container>
    </Layout>
  );
}

/* ---------------Server Side Rendering--------------------------*/

// função que será executada ainda no lado do servidor onde os dados vai
// ser repassado para o component e tudo ainda sera executado no lado servidor
// Quando chegar no cliente só o componente será executado novamente, mas já com os dados.

export async function getServerSideProps({
  query,
}: {
  query: {
    page: string;
  };
}) {
  const res = await fetch(
    `${args.host}/api/trending?page=${query.page ? query.page : 1}`
  );

  const { list, page, total_pages } = (await res.json()) as any;

  return {
    props: {
      list: list ?? [],
      page: page ?? 1,
      total_pages: total_pages ?? 1,
    },
  };
}
