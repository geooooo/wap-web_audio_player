<template>
<div
  ref="app"
  @drop.prevent.stop
  @drag.prevent.stop
  @dragover.prevent.stop
  @dragenter.prevent.stop
  class="app">

    <div class="app__left">

      <div class="app__inputs">

        <div class="app__top">
          <equalizer></equalizer>
          <helper></helper>
          <move-line
            v-model="time"
            @mousemove="showTime"
            @mouseleave="hideHelper"
            :height="20"
            :topRound="false"
            :maxValue="100"></move-line>
        </div>

        <div class="app__bottom">

          <div class="app__container app__container_v">
            <move-line
              @mousemove="showVolume"
              @mouseleave="hideHelper"
              v-model="volume"
              :height="10"
              :maxValue="100"></move-line>
            <move-line
              @mousemove="showSpeed"
              @mouseleave="hideHelper"
              v-model="speed"
              :height="10"
              :maxValue="200"></move-line>
          </div>

          <div class="app__container app__container_c">
            <flatButton
              :type="'prev'"
              @click="prevClick">
            </flatButton>

            <flatButton
              v-show="showPlay"
              :type="'play'"
              @click="playClick">
            </flatButton>
            <flatButton
              v-show="!showPlay"
              :type="'pause'"
              @click="pauseClick">
            </flatButton>

            <flatButton
              :type="'next'"
              @click="nextClick">
            </flatButton>
          </div>

        <div class="app__container app__container_r">
            <flatButton
              ref="listButton"
              @mousemove="showHelperList"
              @mouseleave="hideHelper"
              :type="'list'"
              @click="listClick">
            </flatButton>
            <flatButton
              ref="randomButton"
              @mousemove="showHelperRandom"
              @mouseleave="hideHelper"
              :type="'random'"
              @click="randomClick">
            </flatButton>
            <flatButton
              ref="loopButton"
              @mousemove="showHelperLoop"
              @mouseleave="hideHelper"
              :type="'loop'"
              @click="loopClick">
            </flatButton>
          </div>

        </div>

      </div>

      <div class="app__frameworks">
        <div class="app__framework-vue"></div>
        <div class="app__framework-electron"></div>
      </div>

    </div>

    <div class="app__right">
      <track-list
        @selectplay="trackSelectPlay"
        @clearplay="clearPlayed"></track-list>
    </div>

</div>
</template>


<script>
import equalizer from "./components/Equalizer";
import helper from "./components/Helper";
import moveLine from "./components/MoveLine";
import flatButton from "./components/FlatButton";
import trackList from "./components/TrackList";
import { eventEmitter } from "./main";

export default {
  components: {
    equalizer,
    helper,
    moveLine,
    flatButton,
    trackList
  },

  data() {
    return {
      havePlay: false,
      hideDelay: 500,
      showPlay: true,
      trackTimeMax: 0,
      trackTimeCurrent: 0,
      time: 0,
      volume: 100,
      speed: 100,
      helperListText: "Скрыть список треков",
      helperRandomText: "Включить случайное воспроизведение",
      helperLoopText: "Включить повтор трека"
    };
  },

  methods: {

    // Перевод секунд в формат mm:ss
    formatTime(seconds) {
      seconds = Math.floor(seconds);
      let mm = String(Math.floor(seconds / 60));
      let ss = String(Math.floor(seconds % 60));
      if (mm.length == 1) {
        mm = "0" + mm;
      }
      if (ss.length == 1) {
        ss = "0" + ss;
      }
      return `${mm}:${ss}`;
    },

    showTime() {
      if (this.havePlay) {
        let cur = this.formatTime(this.trackTimeCurrent);
        let max = this.formatTime(this.trackTimeMax);
        this.showHelper(`${cur} / ${max}`);
      } else {
        this.showHelper("Выберите трек");
      }
    },

    showVolume() {
      this.showHelper(`Громкость: ${this.volume}%`);
    },

    showSpeed() {
      this.showHelper(`Скорость: ${this.speed}%`);
    },

    clearPlayed() {
      this.havePlay = false;
      this.pauseClick();
    },

    showHelper(text) {
      eventEmitter.$emit("show-helper", text);
    },

    showHelperList() {
      this.showHelper(this.helperListText);
    },

    showHelperRandom() {
      this.showHelper(this.helperRandomText);
    },

    showHelperLoop() {
      this.showHelper(this.helperLoopText);
    },

    hideHelper(flagDuration) {
      if (flagDuration) {
        window.setTimeout((self) => {
          self.hideHelper();
        }, this.hideDelay, this);
      } else {
        eventEmitter.$emit("hide-helper");
      }
    },

    trackSelectPlay(track) {
      this.havePlay = true;
      this.playClick();
    },

    nextClick() {
      if (!this.havePlay) return;
      eventEmitter.$emit("track-list-next");
    },

    prevClick() {
      if (!this.havePlay) return;
      eventEmitter.$emit("track-list-prev");
    },

    playClick() {
      if (!this.havePlay) return;
      eventEmitter.$emit("play-equalizer");
      this.showPlay = false;
    },

    pauseClick() {
      eventEmitter.$emit("pause-equalizer");
      this.showPlay = true;
    },

    loopClick() {
      if (this.loopClick.f) {
        this.helperLoopText = "Включить повтор трека";
      } else {
        this.helperLoopText = "Отключить повтор трека";
      }
      this.showHelperLoop();
      this.loopClick.f = !this.loopClick.f;
      eventEmitter.$emit("track-list-toggleLoopCurrent");
    },

    randomClick() {
      if (this.randomClick.f) {
        this.helperRandomText = "Включить случайное воспроизведение";
      } else {
        this.helperRandomText = "Отключить случайное воспроизведение";
      }
      this.showHelperRandom();
      this.randomClick.f = !this.randomClick.f;
      eventEmitter.$emit("track-list-toggleRandomNext");
    },

    listClick() {
      if (this.listClick.f) {
        this.helperListText = "Скрыть список треков";
      } else {
        this.helperListText = "Показать список треков";
      }
      this.$refs.app.classList.toggle("app_compact");
      this.showHelperList();
      this.listClick.f = !this.listClick.f;
      eventEmitter.$emit("track-list-toggleVisibility");
    }
  },

  watch: {

    trackTimeCurrent() {
      this.time = Math.trunc(100 / 135 * this.trackTimeCurrent)
    },

  },

  mounted() {
    let self = this;
    // Обработка нажатий клавиш
    window.addEventListener("keydown", e => {
      let key = e.key.toLowerCase();
      switch (key) {
        case "delete":
          eventEmitter.$emit("track-list-deleteSelected");
          break;
        case "arrowup":
          self.prevClick();
          break;
        case "arrowdown":
          self.nextClick();
          break;
        case "arrowright":
          self.nextClick();
          break;
        case "arrowleft":
          self.prevClick();
          break;
        case " ":
        case "p":
          if (self.showPlay) {
            self.playClick();
          } else {
            self.pauseClick();
          }
          break;
        case "enter":
          self.$refs.listButton.click({
            target: self.$refs.listButton.$el
          });
          if (self.listClick.f) {
            self.showHelper("Скрыть список треков");
          } else {
            self.showHelper("Показать список треков");
          }
          self.hideHelper(true);
          break;
        case "l":
          self.$refs.loopButton.click({
            target: self.$refs.loopButton.$el
          });
          if (self.loopClick.f) {
            self.showHelper("Включить повтор трека");
          } else {
            self.showHelper("Отключить повтор трека");
          }
          self.hideHelper(true);
          break;
        case "r":
          self.$refs.randomButton.click({
            target: self.$refs.randomButton.$el
          });
          if (self.randomClick.f) {
            self.showHelper("Включить случайное воспроизведение");
          } else {
            self.showHelper("Отключить случайное воспроизведение");
          }
          self.hideHelper(true);
          break;
        // TODO: регулирование громкости и скорости с клавиатуры
        case "+":
          if (e.altKey) {
            ;
          } else {
            ;
          }
          break;
        case "-":
          if (e.altKey) {
            ;
          } else {
            ;
          }
          break;
      }
    });

    window.addEventListener("resize", e => {
      eventEmitter.$emit("move-line-resize");
    });
  }
};
</script>


<style scoped lang="scss">
@import "base.scss";

$left-padding-h: 20px;
$left-padding-v: 15px;

$margin-right: 10px;

.app {
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  &_compact {
    .app__left {
      min-height: 340px;
      width: 100%;
    }
    .app__right {
      display: none;
    }
    .app__inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .app__top {
      height: 100%;
    }
    .equalizer {
      height: calc(100% - 40px) !important;
    }
    .helper {
      bottom: 10% !important;
      right: 2% !important;
    }
    .app__frameworks {
      display: none;
    }
  }

  &__frameworks {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 100%;
  }

  &__framework-vue,
  &__framework-electron {
    opacity: 0.3;
    transition-duration: $animation-duration;
    transition-timing-function: $animation-timing-function;
    transition-property: opacity;

    &:hover {
      opacity: 1;
    }
  }

  &__framework-vue {
    width: 100px;
    height: 100px;
    background-image: url("./img/vue.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__framework-electron {
    margin-bottom: 10px;
    width: 200px;
    height: 30px;
    background-image: url("./img/electron.svg");
    background-repeat: no-repeat;
    background-size: contain;
  }

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 40%;
    min-width: 400px;
    background-color: darken($color-main-back, 2);
  }

  &__right {
    width: 60%;
  }

  &__inputs {
    padding: $left-padding-v $left-padding-h;
    background-color: $color-main-back;
  }

  &__top {
    height: 370px;
    position: relative;
    margin-bottom: $left-padding-v;

    .equalizer {
      height: 350px;
    }

    .helper {
      position: absolute;
      bottom: 15px + $margin-right;
      right: $margin-right;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .move-line {
      width: 100px;
    }
  }

  &__container {
    display: flex;
    align-items: center;
    width: 100%;

    .flat-button {
      margin-right: $margin-right;

      &:last-child {
        margin-right: 0;
      }
    }

    &_v {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      padding-right: $margin-right;
      height: 40px;
    }

    &_c {
      justify-content: center;

      .flat-button {
        margin-right: $margin-right / 2;

        &:last-child {
          margin-right: $margin-right;
        }
      }
    }

    &_r {
      justify-content: flex-end;
    }
  }
}
</style>
