/*
This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.
*/

import "../styles/global.css";
import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";

/* Here I started on the 0Auth authorization */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="dev-8qklvg4u.eu.auth0.com"
      clientId="5zU6P2QSOg3XFmEfuFxyfy1DT7fgOtf2"
      // Change this at deployment to real URL
      redirectUri={"http://localhost:3000/bloghome"}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
