<template>
  <div id="map">
  </div>
</template>

<script>
import postscribe from "postscribe";

export default {
  props: {
    latitude:{
      default: "41.0053"
    },
    longitude:{
      default: "28.977"
    }
  },
  mounted(){
    this.drawMap();
  },
  methods: {
    drawMap() {
      document.getElementById("map").innerHTML = ""
      postscribe(
        "#map",
        `<script src="https://darksky.net/map-embed/@temperature,${this.latitude},${this.longitude},4.js?embed=true&timeControl=false&fieldControl=false&defaultField=temperature&defaultUnits=_c"><\/script>`
      );
    }
  },
  watch:{
    $props:{
      handler(){
        this.drawMap();
      },
      deep: true, 
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
#map iframe {
  height: 100%;
  width: 100%;
}
</style>