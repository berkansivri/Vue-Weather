<template>
  <div class="dark-sky-widget default-embed" data-name="default">
    <div id="currentDetailsWrapper">
      <div id="currentDetails">
        <div class="wind">
          <span class="label swip">Wind:</span>
          <span class="val swap">
            <span class="num swip">{{currently.windSpeed}} </span>
            <span class="unit swap">m/s</span> 
            <span class="direction" title="NNE" style="display:inline-block;-ms-transform:rotate(16deg);-webkit-transform:rotate(16deg);transform:rotate(16deg);">↑</span>
          </span>
        </div> 
        <div class="humidity">
          <span class="label swip">Humidity:</span>
          <span class="val swap">
            <span class="num swip">{{currently.humidity}} </span><span class="unit swap">%</span>
          </span>
        </div> 
        <div class="dew_point">
          <span class="label swip">Dew Pt:</span>
          <span class="val swap">
            <span class="num">{{currently.dewPoint}}</span><span class="unit">˚</span>
          </span>
        </div> 
         <div class="uv_index">
          <span class="label swip">UV Index:</span>
          <span class="val swap">
            <span class="num">{{currently.uvIndex}}</span>
          </span>
        </div> 
        <div class="visibility"> 
          <span class="label swip">Visibility:</span>
          <span class="val swap">
            <span class="num swip">{{currently.visibility}} </span>
            <span class="unit swap">km</span>
          </span>
        </div> 
        <div class="pressure">
          <span class="label swip">Pressure:</span>
          <span class="val swap">
            <span class="num swip">{{currently.pressure}} </span>
            <span class="unit swap">hPa</span>
          </span>
        </div>
      </div>
    </div>
    <div class="widget-container">
      <header style="color: rgb(51, 51, 51); border-bottom: 2px solid rgb(51, 51, 51);">
        <p id="location" style="color: rgb(51, 51, 51);">Full Forecast</p>
        <p><a id="default-attribution" target="_blank" href="https://darksky.net/forecast/42.360082,-71.05888/us12/en">More at Dark Sky</a><svg class="widget-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style="width: 18px; margin-top: 5px;">
            <path fill="#444" d="M 485 165 C 526 154 568 149 597 147 545 68 512 18 496 0 496 0 493 61 371 210 393 198 438 177 485 165 Z"></path>
            <path fill="#444" d="M 460 868 C 434 800 427 722 427 722 L 387 745 C 387 745 368 680 361 614 354 550 361 486 361 486 L 308 507 C 308 507 304 430 317 356 325 307 340 261 349 236 348 238 346 240 344 242 236 367 144 491 144 644 144 841 303 1000 499 1000 509 1000 519 1000 529 999 513 974 481 923 460 868 Z"></path>
            <path fill="#444" d="M 643 216 C 631 198 620 181 610 166 590 187 561 222 537 259 502 312 482 370 482 370 L 560 346 C 560 346 519 417 499 491 480 555 482 624 482 624 L 536 599 C 536 599 512 688 510 792 508 883 526 965 535 998 714 980 853 829 855 644 856 484 739 359 643 216 Z"></path>
          </svg></p>
      </header>
      <div class="container">
        <div class="current" v-if="Object.keys(currently).length > 0">
          <skycon :condition="currently.icon"></skycon>
          <div class="current-temp" style="color: rgb(51, 51, 51);">
            <strong>{{currently.temperature}}</strong>
            <span>and holding</span>
            <span>Wind: {{currently.windSpeed}}</span>
          </div>
          <div id="current-summary" style="color: rgb(51, 51, 51);">
            <p>{{currently.summary}}</p>
            <p>
              TODO
            </p>
          </div>
        </div>
        <div id="daily">
          <div class="day" v-for="day in daily">
            <p class="day-name" style="color: rgb(51, 51, 51);">
              {{day.time.format('dddd')}}
            </p>
            <skycon width="35" height="35" :condition="day.icon"></skycon>
            <p class="high-temp" style="color: rgb(51, 51, 51);">{{day.temperatureHigh}}</p>
            <p class="low-temp" style="color: rgb(199, 199, 199);">{{day.temperatureLow}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";

export default {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      currently: {},
      daily: {}
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getForecast();
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  methods: {
    async getForecast() {
      var response = await this.$apollo.query({
        query: gql`
          query($latitude: Float!, $longitude: Float!) {
            forecast(latitude: $latitude, longitude: $longitude) {
              timezone
              latitude
              longitude
              currently {
                time
                summary
                icon
                temperature
                windSpeed
                humidity
                dewPoint
                uvIndex
                visibility
                pressure
              }
              daily {
                data {
                  time
                  icon
                  temperatureHigh
                  temperatureLow
                }
              }
            }
          }
        `,
        variables: {
          latitude: this.latitude,
          longitude: this.longitude
        }
      });
      console.log(response);
      this.currently = response.data.forecast.currently;
      this.currently.temperature = Math.trunc(this.currently.temperature);

      response.data.forecast.daily.data.forEach(d => {
        d.time = moment.unix(d.time);
        d.temperatureHigh = Math.trunc(d.temperatureHigh);
        d.temperatureLow = Math.trunc(d.temperatureLow);
      });

      this.daily = response.data.forecast.daily.data;
    }
  }
};
</script>

<style scoped>
@import "../style/font.css";
@import "../style/widget-default.css";
@import "../style/widget-embed.css";
@import "../style/responsive-widget.css";

#currentDetailsWrapper {
    width: 100%;
    line-height: 40px;
    padding: 0 20px;
    background-color: rgba(238,238,238,.35);
    overflow: hidden;
}
#currentDetails {
  position: relative;
  text-align: center;
  left: -10px;
  white-space: nowrap;
  font-size: 14px;
  margin: 0 auto;
  max-width: 750px;
}
#currentDetails .label {
  display: inline-block;
  text-align: right;
  font-weight: 500;
  margin: 0 4px;
}
#currentDetails > div {
  display: inline-block;
  text-align: center;
  margin: 0 10px;
}
#currentDetails .val {
  display: inline-block;
  text-align: left;
  font-weight: 300;
}
</style>
