<template>
<div
    ref="moveLine"
    class="move-line"
    @mousemove="moveLineMouseMove"
    @mouseleave="mouseleave"
    @click="moveLineClick">

    <div
        ref="bar"
        class="move-line__bar"></div>

</div>
</template>


<script>
import { eventEmitter } from "../main";

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
      default: true
    },

    // Максимальое значение связанное с размером полосы
    maxValue: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      clientWidth: 0,
      offsetX: 0
    };
  },

  methods: {
    moveLineMouseMove(e) {
      // Если нажата левая кнопка мыши
      if (e.buttons == 1) {
        this.setValue(this.moveBar(e.offsetX));
      }
      this.$emit("mousemove");
    },

    moveLineClick(e) {
      this.offsetX = e.offsetX;
      this.setValue(this.moveBar(e.offsetX));
    },

    mouseleave() {
      this.$emit("mouseleave");
    },

    moveBar(x) {
      // Погрешность при движении полосы
      const delta = 5;
      const clientWidth = this.$refs.moveLine.clientWidth;
      this.clientWidth = clientWidth;
      if (x < delta) {
        x = 0;
      } else if (clientWidth - x < delta) {
        x = clientWidth;
      }
      this.$refs.bar.style.width = x + "px";
      return x;
    },

    setValue(x) {
      const clientWidth = this.$refs.moveLine.clientWidth;
      let value = this.maxValue / clientWidth * x;
      value = value <= this.maxValue / 2 ? Math.ceil(value) : Math.floor(value);
      this.$emit("input", value);
    },

    resize() {
        const clientWidth = this.$refs.moveLine.clientWidth;
        this.moveBar(clientWidth / this.maxValue * this.value);
    },
  },

  watch: {
    value(newValue) {
      if (newValue === 0) {
        this.moveBar(0);
      }
    }
  },

  mounted() {
    eventEmitter.$on("move-line-move");
    if (!this.topRound) {
        eventEmitter.$on("move-line-resize", this.resize);
    }

    this.$refs.moveLine.style.height = this.height + "px";
    if (this.topRound) {
      this.$refs.moveLine.classList.add("move-line_top-rounded");
    }

    this.moveBar(this.$refs.moveLine.clientWidth / this.maxValue * this.value);
  }
};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.move-line {
  width: 100%;
  border-bottom-left-radius: $border-radius + 1px;
  border-bottom-right-radius: $border-radius + 1px;
  background-color: darken($color-main-front, 1);

  &_top-rounded {
    border-top-left-radius: $border-radius + 1px;
    border-top-right-radius: $border-radius + 1px;
  }

  &__bar {
    width: 0;
    height: 100%;
    border-radius: $border-radius;
    background-color: $color-element-1-inactive;
    transition-duration: $animation-duration;
    transition-timing-function: $animation-timing-function;
    transition-property: background-color;
  }

  &:hover &__bar,
  &:active &__bar {
    background-color: $color-element-1-active;
    box-shadow: $box-shadow;
  }
}
</style>
