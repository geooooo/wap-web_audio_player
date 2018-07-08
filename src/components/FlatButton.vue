<template>

  <button v-if="type === 'next'" @click="click" class="flat-button flat-button_next">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="isolation:isolate"
      viewBox="194.499 265 15.205 20"
      width="15.205"
      height="20">
      <path
        d=" M 195.913 266 Q 208.704 272.5
            208.704 275 Q 208.704 277.5 195.913
            284 M 195.499 269.5 Q 203.316 273.472
            203.316 275 Q 203.316 276.528 195.499
            280.5"
        stroke-linejoin="miter"
        stroke-linecap="square"
        stroke-miterlimit="3"/>
    </svg>
  </button>

  <button v-else-if="type === 'prev'" @click="click" class="flat-button flat-button_prev">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="124.704 265 15.205 20">
      <path
        d=" M 138.495 284 Q 125.704
            277.5 125.704 275 Q 125.704
            272.5 138.495 266 M 138.908
            280.5 Q 131.092 276.528 131.092
            275 Q 131.092 273.472 138.908 269.5"
        stroke-linejoin="miter"
        stroke-linecap="square"
        stroke-miterlimit="3"/>
    </svg>
  </button>

  <button v-else-if="type === 'play'" @click="click" class="flat-button flat-button_circle">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="157.704 263.249 24.452 23.501">
      <path
        d=" M 157.704 284.925 L 157.704
            275 L 157.704 265.075 C 157.704
            263.53 158.83 262.829 160.217
            263.509 L 170.666 268.638 L 181.115
            273.767 C 182.502 274.447 182.502
            275.553 181.115 276.233 L 170.666
            281.362 L 160.217 286.491 C 158.83
            287.171 157.704 286.47 157.704
            284.925 Z "/>
    </svg>
  </button>

  <button v-else-if="type === 'pause'" @click="click" class="flat-button flat-button_circle">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="159.5 262.424 15 25">
      <path
        d=" M 162 262.424 L 162 262.424
            C 163.38 262.424 164.5 263.769
            164.5 265.424 L 164.5 284.424 C
            164.5 286.08 163.38 287.424 162
            287.424 L 162 287.424 C 160.62
            287.424 159.5 286.08 159.5 284.424
            L 159.5 265.424 C 159.5 263.769
            160.62 262.424 162 262.424 Z  M
            172 262.424 L 172 262.424 C 173.38
            262.424 174.5 263.769 174.5 265.424
            L 174.5 284.424 C 174.5 286.08
            173.38 287.424 172 287.424 L 172
            287.424 C 170.62 287.424 169.5
            286.08 169.5 284.424 L 169.5
            265.424 C 169.5 263.769 170.62
            262.424 172 262.424 Z "/>
    </svg>
  </button>

  <button v-else-if="type === 'list'" @click="click" class="flat-button flat-button_rect">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="299 268.5 18 13">
      <path
        d=" M 299 270 C 299 269.172 299.672
            268.5 300.5 268.5 C 301.328 268.5
            302 269.172 302 270 C 302 270.828
            301.328 271.5 300.5 271.5 C 299.672
            271.5 299 270.828 299 270 Z  M 299
            275 C 299 274.172 299.672 273.5 300.5
            273.5 C 301.328 273.5 302 274.172 302
            275 C 302 275.828 301.328 276.5 300.5
            276.5 C 299.672 276.5 299 275.828 299
            275 Z  M 299 280 C 299 279.172 299.672
            278.5 300.5 278.5 C 301.328 278.5 302
            279.172 302 280 C 302 280.828 301.328
            281.5 300.5 281.5 C 299.672 281.5 299
            280.828 299 280 Z  M 304 270 L 317 270
            M 304 280 L 317 280 M 304 275 L 317 275"/>
    </svg>
  </button>

  <button v-else-if="type === 'random'" @click="click" class="flat-button flat-button_rect">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="261.914 267.042 18.651 14.958">
      <path
        d=" M 263.956 268.042 Q 269.097
            275.359 270.956 276.714 Q 272.815
            278.069 277.956 280.042 M 262.914
            281 Q 268.055 273.683 269.914 272.328
            Q 271.774 270.973 276.914 269 M 276.48
            276.958 L 279.565 280.893 L 274.566 281
            M 272.959 268.376 L 277.956 268.563
            L 274.808 272.448"
        stroke-linejoin="miter"
        stroke-linecap="square"
        stroke-miterlimit="3"/>
    </svg>
  </button>

  <button v-else-if="type === 'loop'" @click="click" class="flat-button flat-button_rect">
    <svg
      class="flat-button__pic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="223.852 265 21 19.5">
      <path
          d=" M 237.352 271 L 236.352 266 L 241.352
              266 M 236.852 266.5 Q 243.852 269.188
              243.852 274.5 C 243.852 279.813 238.164
              283.5 233.852 283.5 C 229.539 283.5 224.852
              280.938 224.852 274.5 Q 224.852 268.063 232.852
              266.5"
          stroke-linejoin="miter"
          stroke-linecap="butt"
          stroke-miterlimit="3"/>
    </svg>
  </button>

</template>


<script>
export default {

  props: {

    type: {
      type: String,
      required: true
    },

  },

  data() {
    return {};
  },

  methods: {
    click() {
      this.$emit("click");
    }
  },

};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.flat-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid $color-element-1-inactive;
  background-color: $color-main-front;
  transition-duration: $animation-duration;
  transition-timing-function: $animation-timing-function;
  transition-property: border-color, background-color;
  cursor: pointer;

  &:hover {
    border-color: $color-element-1-active;
    box-shadow: $box-shadow;
  }

  &:active {
    border-color: $color-main-back;
    background-color: $color-main-back;
  }

  &_circle {
    width: 40px;
    height: 40px;
    border-radius: 100%;

    .flat-button__pic {
      fill: $color-element-1-inactive;
    }

    &:hover .flat-button__pic {
      fill: $color-element-1-active;
    }

    &:active .flat-button__pic {
      fill: $color-element-1-inactive;
    }
  }

  &_next {
    width: 30px;
    height: 36px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  &_prev {
    width: 30px;
    height: 36px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  &_rect {
    width: 30px;
    height: 30px;
    border-radius: $border-radius;
  }

  &__pic {
    width: 15px;
    height: 15px;
    fill: none;
    stroke: $color-element-1-inactive;
    stroke-width: 2px;
    transition-duration: $animation-duration;
    transition-timing-function: $animation-timing-function;
    transition-property: stroke fill;
  }
  &:hover &__pic {
     stroke: $color-element-1-active;
  }
  &:active &__pic {
    stroke: $color-element-1-inactive;
  }
}

</style>
