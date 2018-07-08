<template>
<div class="app">

    <div class="app__left">

      <div class="app__top">
        <equalizer></equalizer>
        <helper></helper>
        <move-line
          v-model="time"
          @mousemove="showHelper('TODO: время')"
          @mouseleave="hideHelper"
          :height="20"
          :topRound="false"
          :maxValue="100"></move-line>
      </div>

      <div class="app__bottom">

        <div class="app__container app__container_v">
          <move-line
            @mousemove="showHelper('TODO: громкость')"
            @mouseleave="hideHelper"
            v-model="volume"
            :height="10"
            :maxValue="100"></move-line>
          <move-line
            @mousemove="showHelper('TODO: скорость')"
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
            @mousemove="showHelperList"
            @mouseleave="hideHelper"
            :type="'list'"
            @click="listClick">
          </flatButton>
          <flatButton
            @mousemove="showHelperRandom"
            @mouseleave="hideHelper"
            :type="'random'"
            @click="randomClick">
          </flatButton>
          <flatButton
            @mousemove="showHelperLoop"
            @mouseleave="hideHelper"
            :type="'loop'"
            @click="loopClick">
          </flatButton>
        </div>

      </div>

    </div>

    <div class="app__right">
      <track-list></track-list>
    </div>

</div>
</template>


<script>
import equalizer from "./components/Equalizer";
import helper from "./components/Helper";
import moveLine from "./components/MoveLine";
import flatButton from "./components/FlatButton";
import trackList from "./components/TrackList";
import {eventEmitter} from "./main";

export default {

  components: {
    equalizer,
    helper,
    moveLine,
    flatButton,
    trackList,
  },

  data() {
    return {
      showPlay: true,
      time: 0,
      volume: 50,
      speed: 100,
      helperListText: "Скрыть список треков",
      helperRandomText: "Включить случайное воспроизведение",
      helperLoopText: "Включить повтор трека",
    };
  },

  methods: {

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

    hideHelper() {
      eventEmitter.$emit("hide-helper");
    },

    trackSelectPlay(track) {
      console.log(track);
    },

    nextClick() {
      eventEmitter.$emit('track-list-next');
    },

    prevClick() {
      eventEmitter.$emit('track-list-prev');
    },

    playClick() {
      eventEmitter.$emit('play-equalizer');
      this.showPlay = false;
    },

    pauseClick() {
      eventEmitter.$emit('pause-equalizer');
      this.showPlay = true;
    },

    loopClick() {
      if (this.loopClick.f) {
        this.helperLoopText = 'Включить повтор трека';
      } else {
        this.helperLoopText = 'Отключить повтор трека';
      }
      this.showHelperLoop();
      this.loopClick.f = !this.loopClick.f;
      eventEmitter.$emit('track-list-toggleLoopCurrent');
    },

    randomClick() {
      if (this.randomClick.f) {
        this.helperRandomText = 'Включить случайное воспроизведение';
      } else {
        this.helperRandomText = 'Отключить случайное воспроизведение';
      }
      this.showHelperRandom();
      this.randomClick.f = !this.randomClick.f;
      eventEmitter.$emit('track-list-toggleRandomNext');
    },

    listClick() {
      if (this.listClick.f) {
        this.helperListText = 'Скрыть список треков';
      } else {
        this.helperListText = 'Показать список треков';
      }
      this.showHelperList();
      this.listClick.f = !this.listClick.f;
      eventEmitter.$emit('track-list-toggleVisibility');
    },

  },

  mounted() {

    // Обработка нажатий клавиш
    window.addEventListener("keypress", (e) => {
      //TODO: keypress
      // if (e.key.toLowerCase() === "delete") {
      //   eventEmitter.$emit("track-list-deleteSelected");
      // }
    });

    window.addEventListener("resize", (e) => {
      eventEmitter.$emit("move-line-resize");
    });

  },

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
  background-color: $color-main-back;

  &__left {
    padding: $left-padding-v $left-padding-h;
    width: 40%;
    min-width: 400px;
  }

  &__right {
    width: 60%;
  }

  &__top {
    position: relative;
    margin-bottom: $left-padding-v;

    .helper {
      position: absolute;
      bottom: 20px + $margin-right;
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
