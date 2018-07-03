<template>
<div class="app">

    <equalizer>
    </equalizer>

    <button @click="play">play</button>
    <button @click="pause">pause</button>
    <button @click="stop">stop</button>

    <hr>

    <helper></helper>

    <input v-model="helperText" type="text">
    <button @click="showHelper">show helper</button>
    <button @click="hideHelper">hide helper</button>

</div>
</template>


<script>
import equalizer from "./components/Equalizer";
import helper from "./components/Helper";
import {eventEmitter} from "./main";

export default {

  components: {
    equalizer,
    helper,
  },

  data() {
    return {
      helperText: "",
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

  }

};
</script>


<style scoped lang="scss">
.app {
  height: 100%;
  background-color: #177;
}
</style>
