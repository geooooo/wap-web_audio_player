<template>
<div
    ref="equalizer"
    class="equalizer">

    <div class="equalizer__container">
        <div
            v-for="i in 10"
            :key="i"
            class="equalizer__level"></div>
    </div>

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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
    min-width: 300px;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    background-color: $color-main-front;

    &__container {
        display: flex;
        justify-content: center;
        height: 30%;
        width: 50%;
        min-height: 300px;
        min-width: 300px;
        transform: rotateZ(180deg);
    }

    &__level {
        margin-right: 5px;
        height: 0;
        width: 15px;
        background-color: $color-element-1-inactive;
        animation-direction: alternate;
        animation-iteration-count: 0;

        &:last-child {
            margin-right: 0;
        }

        // Для каждой полоски задаётся случайная высота,
        // анимация со случайной скоростью
        // и случайная анимационная функция
        @for $i from 1 to 11 {
            $animation-duration: random(4) / random(5) + s;
            $max-height: random(80);
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
                    height: 0;
                }
                to {
                    height: $max-height + %;
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
