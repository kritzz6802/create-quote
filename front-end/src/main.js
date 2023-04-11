import { createApp,provide, h } from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  uri: 'https://mevn-product-selling.onrender.com/',
  headers:{
    authorization:localStorage.getItem('token') || ''
  }
});
console.log('https://mevn-product-selling.onrender.com/');
import { DefaultApolloClient } from '@vue/apollo-composable'
// import { createApolloClient } from './apollo-client'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

// const app = createApp(App)

// app.provide(DefaultApolloClient, apolloClient)

app.use(router).mount('#app')


// const app = createApp({
//   setup () {
//     provide(DefaultApolloClient, apolloClient)
//   },

//   render: () => h(App),
// })

// app.mount('#app');
