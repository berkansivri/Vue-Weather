<template>
	<div id="search">
		<input ref="autocomplete"
		 placeholder="Search"
		 class="search-location"
		 onfocus="value = ''"
		 type="text"  
    />
	</div>
</template>

<script>
export default { 
	mounted() {
		this.autocomplete = new google.maps.places.Autocomplete(
			this.$refs.autocomplete,
			{ types: ["geocode"] }
    ); 
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  },
  methods:{
    onPlaceChanged(){
      let place = this.autocomplete.getPlace();
			let lat = place.geometry.location.lat();
			let long = place.geometry.location.lng();
			this.$eventBus.$emit("geoLocationChange", {lat,long});
    }
  }
};
</script>

<style scoped>
*,
*::after,
*::before {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}
#search {
  position: relative;
  z-index: 1;
}
.search-location {
	display: block;
	width: 100%;
	font-size: 15px;
	font-weight: 300;
	outline: none;
  height: 35px;
	line-height: 30px;
	text-align: center;
  border-radius: 10px;
  border: 1px solid #333;
}
</style>