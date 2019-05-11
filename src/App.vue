<template>
  <div id="app" v-if="latitude && longitude">
    <Map :latitude="latitude" :longitude="longitude"></Map>
    <Forecast :latitude="latitude" :longitude="longitude"></Forecast>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Forecast from './components/Forecast';
import Map from './components/Map'
export default {
  name: 'app',
  components: {
    Forecast,
    Map
  },
  data(){
    return {
      latitude: null,
      longitude: null
    }
  },
  watch:{
    hello(val){
      console.log(val);
    }
  },
  apollo:{
    hello: gql`
      query {
        hello
      }
    `
  },
  beforeCreate() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => { 
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        err => {
          console.log(err);
        }
      );
    }
    this.$eventBus.$on("geoLocationChange", ({lat,long}) => {
      this.latitude = lat;
      this.longitude = long;
    })
  },
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
  background-color: #fcfcfc; 
}
</style>
