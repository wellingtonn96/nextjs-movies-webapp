import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { Container } from "../styles/home.styles";
import Link from "next/link";

interface IPropsComponent {
  list: any[];
}

export default function Home({ list }: IPropsComponent) {
  return (
    <Layout>
      <Container>
        <h1>Filmes em destaque</h1>
        <div>
          {list.map((item, index) => (
            <div key={index}>
              <Link href={`/post/${item.id}`}>
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
        </div>
      </Container>
    </Layout>
  );
}

/* ---------------server side rendering--------------------------*/

// função que será executada ainda no lado do servidor onde os dados vai
// ser repassado para o component e tudo ainda sera executado no lado servidor
// Quando chegar no cliente só o componente será executado novamente mas já com os dados

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/trending");

  const { list } = (await res.json()) as any;

  return {
    props: {
      list,
    },
  };
}
