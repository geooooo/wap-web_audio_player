<template>
<div class="app">

    <equalizer style="height: 300px">
    </equalizer>

    <!-- <button @click="play">play</button>
    <button @click="pause">pause</button> -->
    <!-- <button @click="stop">stop</button> -->

    <!-- <helper></helper>

    <input v-model="helperText" type="text">
    <button @click="showHelper">show helper</button>
    <button @click="hideHelper">hide helper</button> -->

    <!-- <move-line
      :height="20"
      :topRound="false"
      :maxValue="100"
      v-model="moveLine1Value"></move-line> -->
    <!-- <p>{{ moveLine1Value }}</p> -->
    <!-- <button @click="()=>this.moveLine1Value = 0">=> 0</button> -->

    <flatButton
      :type="'prev'"
      @click="prevClick">
    </flatButton>

    <flatButton
      :type="'next'"
      @click="nextClick">
    </flatButton>

    <flatButton
      :type="'play'"
      @click="playClick">
    </flatButton>

    <flatButton
      :type="'pause'"
      @click="pauseClick">
    </flatButton>

    <flatButton
      :type="'list'"
      @click="listClick">
    </flatButton>

    <flatButton
      :type="'random'"
      @click="randomClick">
    </flatButton>

    <flatButton
      :type="'loop'"
      @click="loopClick">
    </flatButton>

    <track-list
      @selectplay="trackSelectPlay"></track-list>

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
      helperText: "",
      moveLine1Value: 0,
      moveLine2Value: 0,
    };
  },

  methods: {

    showHelper() {
      eventEmitter.$emit("show-helper", this.helperText);
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
    },

    pauseClick() {
      eventEmitter.$emit('pause-equalizer');
    },

    loopClick() {
      eventEmitter.$emit('track-list-toggleLoopCurrent');
    },

    randomClick() {
      eventEmitter.$emit('track-list-toggleRandomNext');
    },

    listClick() {
      eventEmitter.$emit('track-list-toggleVisibility');
    },

  },

  mounted() {
    window.addEventListener("keypress", (e) => {
      if (e.key.toLowerCase() === "delete") {
        eventEmitter.$emit("track-list-deleteSelected");
      }
    });
  }

};
</script>


<style scoped lang="scss">
@import "base.scss";

.app {
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  height: 100%;
  background-color: $color-main-back;
}
</style>
