<template>
<div
    ref="track"
    class="track"
    @click="click">

    <div class="track__title">{{ title }}</div>

    <div class="track__time">{{ time }}</div>

</div>
</template>


<script>
export default {

  props: {

      // Название трека
      title: {
          type: String,
          required: true
      },

      // Длительность трека по времени 00:00
      time: {
          type: String,
          required: true
      },

      // Выбран ли трек
      selected: {
          type: Boolean,
          required: true,
      },

      // Проигрываемый ли трек
      played: {
          type: Boolean,
          required: true,
      },

  },

  data() {
    return {};
  },

  methods: {

      click(e) {
          this.$emit("click", e);
      },

      // Переключить состояние трэка
      toggleState(state) {
        this.$refs.track.classList.toggle("track_" + state);
      },

  },

  watch: {

      selected() {
          this.toggleState("selected");
      },

      played() {
          this.toggleState("played");
      },

  }

};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.track {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: $color-element-2-inactive;
    font-family: Sans;
    transition-duration: $animation-duration;
    transition-timing-function: $animation-timing-function;
    transition-property: color;

    &:hover {
        color: $color-element-2-active;
    }

    &_selected {
        background-color: $color-element-1-active;
        color: $color-element-2-active;
    }

    &_played {
        background-color: $color-element-1-inactive;
        color: $color-element-2-active;
    }

    &__title {
        padding-right: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

</style>
