import React from "react";
import { AppProps } from "next/app";
import GlobalStyle from "../styles/globals";
import { client } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
