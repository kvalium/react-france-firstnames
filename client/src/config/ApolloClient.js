import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const appoloHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:4000';

export const AppoloClient = new ApolloClient({
    link: new HttpLink({ uri:  `${appoloHost}/graphql` }),
    cache: new InMemoryCache(),
});