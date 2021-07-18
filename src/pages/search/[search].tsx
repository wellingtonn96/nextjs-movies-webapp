import { FormEvent, useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Container, MoviesContainer } from "../../styles/home.styles";
import Link from "next/link";
import { args } from "../../configs/api";
import Pagination from "../../components/Pagination";

interface IPropsComponent {
  list: any[];
  page: number;
  total_pages: number;
  searchParam: string;
}

export default function Home({
  list,
  page,
  total_pages,
  searchParam,
}: IPropsComponent) {
  const router = useRouter();
  // const [data, setData] = useState(results);
  const [search, setSearch] = useState(searchParam);
  const [, setCurrentPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    return router.push(`/search/${search}?page=${value}`);
  };

  async function handleSearchMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push({
      pathname: `/search/${search}`,
    });
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
            value={search}
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

export async function getServerSideProps({
  query,
}: {
  query: {
    search: string;
    page?: string;
  };
}) {
  const response = await fetch(
    `${args.base_url}/search/movie?api_key=${args.api_key}&query=${
      query.search
    }&page=${query.page ? query.page : 1}&language=pt-BR`
  );

  const { results, page, total_pages } = (await response.json()) as any;

  return {
    props: {
      list: results,
      page,
      total_pages,
      searchParam: query.search,
    },
  };
}
