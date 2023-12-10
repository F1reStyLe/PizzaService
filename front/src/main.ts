import { createApp } from 'vue';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// GraphQl
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

// Vue router
import router from './router.ts';

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:7000/graphql',
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(apolloProvider).use(vuetify).use(router).mount('#app');