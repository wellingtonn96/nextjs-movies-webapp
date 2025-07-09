import React from "react";
import { AppProps } from "next/app";
import GlobalStyle from "../styles/globals";

const GlobalStyleComponent = GlobalStyle as React.ComponentType;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyleComponent />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
