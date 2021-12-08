import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import config from 'config';
import { getLanguageCode } from 'i18n';
import { RetryLink } from 'apollo-link-retry';
import { AuthToken } from 'modules/auth/authToken';

const retryLink = new RetryLink({
  attempts: {
    max: 2,
  },
});

const authLink = setContext(async (_, { headers }) => {
  let token = await AuthToken.get();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Accept-Language': getLanguageCode(),
    },
  };
});

const httpLink = createHttpLink({
  uri: `${config.backendUrl}`,
});

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const graphqlClient = new ApolloClient({
  link: retryLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: defaultOptions,
});

export default graphqlClient;
