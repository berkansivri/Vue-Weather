import Vue from "vue"
import App from "./App.vue"
import ApolloClient from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"
import VueApollo from "vue-apollo"
import Skycon from "./components/Skycon.vue"

Vue.use(VueApollo)
Vue.config.productionTip = false
  
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_WEATHER_API,
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.component("skycon", Skycon)

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app")
