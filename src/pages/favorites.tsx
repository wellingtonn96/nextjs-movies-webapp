import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { Container, MoviesContainer } from "../styles/home.styles";
import React from "react";
import Link from "next/link";
import { args } from "../configs/api";
import Loader from "react-loader-spinner";
import { FiHeart } from "react-icons/fi";
import { Button } from "@material-ui/core";

interface IPropsComponent {
  list: any[];
  page: number;
  total_pages: number;
}

const FavoriesMoviesPage: React.FC<IPropsComponent> = ({
  list,
  page,
  total_pages,
}) => {
  const [movies, setMovies] = useState<any[] | undefined>(undefined);
  const router = useRouter();

  // const classes = useStyles();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    router.push(`/?page=${value}`);
    return setMovies(undefined);
  };

  async function handleSearchMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    return router.push(`/search/${search}`);
  }

  useEffect(() => {
    setMovies(list);
  }, [list]);

  return (
    <Layout>
      <Container>
        <div className="link-favorites">
          <FiHeart size={40} />
          <Link href={`favorites`}>
            <a style={{ marginLeft: "10px" }} className="link-favorite">
              filmes favoritos
            </a>
          </Link>
        </div>
        <h1>Filmes em destaque</h1>
        <form onSubmit={handleSearchMovie}>
          <input
            type="text"
            placeholder="Procure por um filme, série..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </form>
        {movies ? (
          <MoviesContainer>
            {movies
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
                  <div>
                    {item.vote_average ? (
                      <p>
                        Nota: <span>{item.vote_average}</span>
                      </p>
                    ) : (
                      <p>
                        Nota: <span>Sem avaliação</span>
                      </p>
                    )}
                  </div>
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
};

export default FavoriesMoviesPage;

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
      list,
      page,
      total_pages,
    },
  };
}
