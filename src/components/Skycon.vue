<template>
  <canvas :id="id" :width="width" :height="height"></canvas>
</template>

<script>
import Skycons from "skycons";
export default {
  props: {
    width: {
      type: [String, Number],
      default: 64
    },
    height: {
      type: [String, Number],
      default: 64
    },
    condition: {
      type: String
    },
    color: {
      type: String,
      default: "black"
    }
  },
  data: function() {
    return {
      id: "canvas" + this._uid,
      skycons: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // initialize skycons
      this.destroy();
      this.skycons = new Skycons({
        color: this.color
      });
      this.setCondition(this.condition);
      this.skycons.play();
    },
    setCondition(value) {
      value = value.toUpperCase().replace(/-/g, "_");
      if (this.skycons) {
        this.skycons.set(this.id, Skycons[value]);
      }
    },
    destroy() {
      if (this.id && this.skycons) {
        this.skycons.remove(this.id);
      }
    }
  },
  watch: {
    condition(value) {
      this.setCondition(value);
    }
  },
  destroyed() {
    this.destroy();
  }
};
</script>