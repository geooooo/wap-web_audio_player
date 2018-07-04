<template>
<div
    ref="moveLine"
    class="move-line"
    @mousemove="moveLineMouseMove"
    @click="moveLineClick">

    <div
        ref="bar"
        class="move-line__bar"></div>

</div>
</template>


<script>
import {eventEmitter} from "../main";

export default {

  props: {

      // v-model
      value: {
          type: Number,
          required: true
      },

      // Высота компонента
      height: {
          type: Number,
          required: true
      },

      // Округлость верхней границы
      topRound: {
          type: Boolean,
          required: true
      },

      // Максимальое значение связанное с размером полосы
      maxValue: {
          type: Number,
          required: true
      },

  },

  data() {
    return {};
  },

  methods: {

      moveLineMouseMove(e) {
        // Если нажата левая кнопка мыши
        if (e.buttons == 1) {
            this.moveBar(e.offsetX);
        }
      },

      moveLineClick(e) {
        this.moveBar(e.offsetX);
      },

      moveBar(x) {
        // Погрешность при движении полосы
        const delta = 5;
        const clientWidth = this.$refs.moveLine.clientWidth;
        if (x < delta) {
            x = 0;
        } else if (clientWidth - x < delta) {
            x = clientWidth
        }
        this.$refs.bar.style.width = x + "px";
        let value = this.maxValue / clientWidth * x;
        value = (value <= this.maxValue / 2)?
            Math.ceil(value) :
            Math.floor(value);
        this.$emit("input", value);
      },

  },

  watch: {

      value(newValue) {
          if (newValue === 0) {
              this.moveBar(0);
          }
      },

  },

  mounted() {
      eventEmitter.$on("move-line-move")

      this.$refs.moveLine.style.height = this.height + "px";
      if (this.topRound) {
          this.$refs.moveLine.classList.add("move-line_top-rounded");
      }
  },

};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.move-line {
    width: 100%;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    background-color: $color-main-front;

    &_top-rounded {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
    }

    &__bar {
        width: 0;
        height: 100%;
        border-radius: $border-radius;
        background-color: $color-element-1-inactive;
        transition-duration: $animation-duration;
        transition-timing-function: $animation-timing-function;
        transition-property: background-color;

        &:hover,
        &:active {
            background-color: $color-element-1-active;
        }
    }
}

</style>
