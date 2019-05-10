<template>
  <div class="dark-sky-widget default-embed" data-name="default">
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
        <div class="current">
          <skycon condition="partly-cloudy-night"></skycon>
          <div class="current-temp" style="color: rgb(51, 51, 51);">
            <strong>50˚</strong>
            <span>and holding</span>
            <span>Wind: 4 mph</span>
          </div>
          <div id="current-summary" style="color: rgb(51, 51, 51);">
            <p>Mostly Cloudy.</p>
            <p>
              Mostly cloudy throughout the&nbsp;day.
            </p>
          </div>
        </div>
        <div id="daily">
          <div class="day">
            <p class="day-name" style="color: rgb(51, 51, 51);">
              Today
            </p>
            <skycon width="35" height="35" condition="partly-cloudy-day"></skycon>
            <p class="high-temp" style="color: rgb(51, 51, 51);">62˚</p>
            <p class="low-temp" style="color: rgb(199, 199, 199);">48˚</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "../style/font.css";
@import "../style/responsive-widget.css";
@import "../style/widget-default.css";
@import "../style/widget-embed.css";
</style>
