<template>
<div class="app">

    <equalizer>
    </equalizer>

    <button @click="play">play</button>
    <button @click="pause">pause</button>
    <button @click="stop">stop</button>

    <helper></helper>

    <input v-model="helperText" type="text">
    <button @click="showHelper">show helper</button>
    <button @click="hideHelper">hide helper</button>

    <move-line
      :height="20"
      :topRound="false"
      :maxValue="100"
      v-model="moveLine1Value"></move-line>
    <p style="color:white">{{ moveLine1Value }}</p>
    <button @click="()=>this.moveLine1Value = 0">=> 0</button>

    <div style="padding-left: 400px">
    <move-line
      :height="40"
      :topRound="true"
      :maxValue="5"
      v-model="moveLine2Value"></move-line>
      <p style="color:white">{{ moveLine2Value }}</p>
      <button @click="()=>this.moveLine2Value = 0">=> 0</button>
    </div>

</div>
</template>


<script>
import equalizer from "./components/Equalizer";
import helper from "./components/Helper";
import moveLine from "./components/MoveLine";
import {eventEmitter} from "./main";

export default {

  components: {
    equalizer,
    helper,
    moveLine,
  },

  data() {
    return {
      helperText: "",
      moveLine1Value: 0,
      moveLine2Value: 0,
    };
  },

  methods: {

    play() {
      eventEmitter.$emit('play-equalizer');
    },

    pause() {
      eventEmitter.$emit('pause-equalizer');
    },

    stop() {
      eventEmitter.$emit('stop-equalizer');
    },

    showHelper() {
      eventEmitter.$emit("show-helper", this.helperText);
    },

    hideHelper() {
      eventEmitter.$emit("hide-helper");
    },

  },

};
</script>


<style scoped lang="scss">
@import "base.scss";

.app {
  cursor: pointer;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
</style>
