import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


import { API_URL } from "./config";

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: API_URL });

const client = new ApolloClient({
  link: httpLink,
  cache
});

export default client;
