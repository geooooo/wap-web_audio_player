<template>
<div ref="helper" class="helper">

    <div class="helper__text">{{ text }}</div>

</div>
</template>


<script>
import {eventEmitter} from "../main";

export default {

  data() {
    return {
        text: "helper text",
    };
  },

  methods: {

      show(text) {
          this.text = text;
          this.$refs.helper.classList.remove("helper_hide");
          this.$refs.helper.classList.add("helper_show");
      },

      hide() {
          this.$refs.helper.classList.remove("helper_show");
          this.$refs.helper.classList.add("helper_hide");
      },

  },

  mounted() {
      eventEmitter.$on("show-helper", (text) => this.show(text));
      eventEmitter.$on("hide-helper", (text) => this.hide());
  },

};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.helper {
    opacity: 0;
    animation-duration: $animation-duration;
    animation-timing-function: $animation-timing-function;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;

    &_show {
        animation-name: show;
    }

    &_hide {
        animation-name: hide;
    }

    &__text {
        color: $color-element-2-inactive;
        font-size: 1.2rem;
    }
}

@keyframes show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes hide {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

</style>
