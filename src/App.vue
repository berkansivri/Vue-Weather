<template>
  <div id="app">
    <h1>{{hello}}</h1>
    <Forecast></Forecast>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Forecast from './components/Forecast';

export default {
  name: 'app',
  components: {
    Forecast
  },
  apollo:{
    hello: gql`
      query {
        hello
      }
    `
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
