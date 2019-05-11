<template>
	<div id="icons">
		<canvas :id="id" :width="width" :height="height" v-show="icon"></canvas>
		<img :width="width" :height="height" :src="darkskyIcons()" alt="partly-cloudy-day Icon" v-show="!icon">
	</div>
</template>

<script>
import Skycons from "../assets/skycons.js";
export default {
	props: {
		width: {
			type: [Number],
			default: 64
		},
		height: {
			type: [Number],
			default: 64
		},
		condition: {
			type: String
		},
		color: {
			type: String,
			default: "black"
		},
		icon: {
			type: Boolean,
			default: false
		}
	},
	data: function() {
		return {
			id: "icon" + this._uid,
			skycons: null
		};
	},
	mounted() {
		this.skyconsIcons();
	},
	methods: {
		skyconsIcons() { 
			this.destroy();
			this.skycons = new Skycons({
				color: this.color
			});
			this.setCondition(this.condition);
			this.skycons.play();
		},
		setCondition() {
			var cond = this.condition.toUpperCase().replace(/-/g, "_");
			this.skycons.set(this.id, Skycons[cond]);
		},
		destroy() {
			if (this.skycons) {
				this.skycons.remove(this.id);
			}
		},
		darkskyIcons() {
			return require(`../assets/icons/${this.condition}.png`);
		}
	},
	watch: {
		condition() {
			this.setCondition()
		}
	},
	destroyed() {
		this.destroy();
	}
};
</script>