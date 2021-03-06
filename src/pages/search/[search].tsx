import { FormEvent, useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Container, MoviesContainer } from "../../styles/home.styles";
import Link from "next/link";
import { args } from "../../configs/api";
import Pagination from "../../components/Pagination";
import Loader from "react-loader-spinner";
import { client } from "../../lib/apollo";
import { GET_MOVIES_BY_NAME } from "../../lib/graphql/queries";

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
  const [movies, setMovies] = useState<any[] | undefined>(undefined);
  const [search, setSearch] = useState(searchParam);
  const [, setCurrentPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    router.push(`/search/${search}?page=${value}`);
    return setMovies(undefined);
  };

  async function handleSearchMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push({
      pathname: `/search/${search}`,
    });
  }

  useEffect(() => {
    setMovies(list);
  }, [list]);

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
        {movies ? (
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
          <div
            style={{
              display: "flex",
              padding: "40px 0",
              justifyContent: "center",
            }}
          >
            <Loader type="Oval" color="#111111" height={80} width={80} />
          </div>
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
  console.log(query.page);

  const { data } = await client.query({
    query: GET_MOVIES_BY_NAME,
    variables: {
      page: query.page ? parseFloat(query.page) : 1,
      name: query.search,
    },
  });

  const { results, total_pages, page } = data.getMoviesByName;

  return {
    props: {
      list: results ? results : [],
      page: page ? page : 0,
      total_pages: total_pages ? total_pages : 0,
      searchParam: query.search,
    },
  };
}
