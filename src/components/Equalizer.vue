<template>
<div>

<svg
    ref="equalizer"
    class="equalizer"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewbox="0 0 300 200"
    width="300"
    height="200">

  <defs>
    <clippath id="_clipPath_CQiDeDt5LjfNisHjOtz6tBVC5dDS3vKo">
      <rect width="300" height="200"></rect>
    </clippath>
  </defs>

  <g clip-path="url(#_clipPath_CQiDeDt5LjfNisHjOtz6tBVC5dDS3vKo)">

    <rect
        x="0" y="0"
        width="300" height="200"></rect>

    <g style="isolation:isolate;">

      <rect
        class="equalizer__level"
        x="208"></rect>

      <rect
        class="equalizer__level"
        x="194"></rect>

      <rect
        class="equalizer__level"
        x="180"></rect>

      <rect
        class="equalizer__level"
        x="166"></rect>

      <rect
        class="equalizer__level"
        x="152"></rect>

      <rect
        class="equalizer__level"
        x="138"></rect>

      <rect
        class="equalizer__level"
        x="124"></rect>

      <rect
        class="equalizer__level"
        x="110"></rect>

      <rect
        class="equalizer__level"
        x="96"></rect>

      <rect
        class="equalizer__level"
        x="82"></rect>

    </g>

  </g>

</svg>

</div>
</template>


<script>
import {eventEmitter} from "../main";

export default {

  data() {
    return {
        isPaused: false,    // Анимация на паузе
        isPlayed: false,    // Анимация включена
        isStoped: false,    // Анимация остановлена
    };
  },

  methods: {

      // Получить все полосы эквалайзера
      getLevels() {
          return this.$refs.equalizer.querySelectorAll('.equalizer__level');
      },

      // Включение анимации
      play() {
          for (let level of this.getLevels()) {
            this.isStoped = false;
            this.isPaused = false;
            this.isPlayed = true;
            level.classList.remove("equalizer__level_pause");
            level.classList.add("equalizer__level_play");
          }
      },

      // Остановка анимации
      stop() {
          for (let level of this.getLevels()) {
            level.classList.remove("equalizer__level_pause");
            level.classList.remove("equalizer__level_play");
            this.isPaused = false;
            this.isPlayed = false;
            this.isStoped = true;
          }
      },

      // Приостановить анимацию
      pause() {
          // На "паузу" можно поставить только когда
          // был нажат "плей"
          if (this.isPlayed) {
            for (let level of this.getLevels()) {
                this.isPlayed = false;
                this.isPaused = true;
                level.classList.add("equalizer__level_pause");
            }
          }
      }

  },

  mounted() {
      eventEmitter.$on("play-equalizer",  () => this.play());
      eventEmitter.$on("pause-equalizer", () => this.pause());
      eventEmitter.$on("stop-equalizer",  () => this.stop());
  }

};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.equalizer {
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    fill: $color-main-front;

    &__level {
        width: 10px;
        fill: $color-element-1-inactive;
        animation-direction: alternate;
        animation-iteration-count: 0;

        // Для каждой полоски задаётся случайная высота,
        // анимация со случайной скоростью
        // и случайная анимационная функция
        @for $i from 1 to 11 {
            $animation-duration: random(4) / random(5) + s;
            $max-height: random(100);
            $function-number: random(5);
            $animation-function: linear;

            @if $function-number == 1 {
                $animation-function: ease;
            } @else if $function-number == 2 {
                $animation-function: ease-in;
            } @else if $function-number == 3 {
                $animation-function: ease-out;
            } @else {
                $animation-function: ease-in-out;
            }

            @keyframes level-move-#{$i} {
                from {
                    y: 143px;
                    height: 0;
                }
                to {
                    y: (143 - $max-height) + px;
                    height: $max-height + px;
                }
            }

            &:nth-child(#{$i}) {
                animation-duration: $animation-duration;
                animation-timing-function: $animation-function;
            }

            &_play:nth-child(#{$i}) {
                animation-name: level-move-#{$i};
            }
        }

        &_play {
            animation-iteration-count: infinite;
        }

        &_pause {
            animation-play-state: paused;
        }
    }
}

</style>
