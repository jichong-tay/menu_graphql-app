import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App.tsx";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL || "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
