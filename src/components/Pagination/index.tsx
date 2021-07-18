import { Container } from "./styles";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";

interface IPropsComponent {
  handleChange:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined;
  page: number;
  total_pages: number;
}

export default function Home({
  handleChange,
  page,
  total_pages,
}: IPropsComponent) {
  return (
    <Container>
      <Pagination
        count={total_pages}
        page={page}
        shape="rounded"
        onChange={handleChange}
      />
    </Container>
  );
}
