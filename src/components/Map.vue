<template>
  <div id="map"> 
  </div>
</template>

<script>
import postscribe from 'postscribe'

export default {
  mounted(){
    let latitude = "39.000";
    let longitude = "-95.000,4.";
    postscribe('#map', `<script src="https://darksky.net/map-embed/@temperature,${latitude},${longitude},4.js?embed=true&timeControl=false&fieldControl=false&defaultField=temperature&defaultUnits=_c"><\/script>`)
  }
}
</script>
