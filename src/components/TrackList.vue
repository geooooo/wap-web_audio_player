<template>
<div
    ref="trackList"
    @drop.prevent.stop="addDropFiles($event.dataTransfer.files)"
    @drag.prevent.stop
    @dragover.prevent.stop
    @dragleave.stop.self.prevent="dragleave"
    @dragenter="dragenter"
    @mousemove="mousemove"
    @mouseleave="mouseleave"
    @wheel="wheel"
    class="track-list track-list_c">

    <div
      ref="lightTop"
      class="light light_top"></div>

    <div ref="emptyText" class="track-list__empty-text">
        Перетащите сюда свои треки
    </div>

    <div
      ref="container"
      class="track-list__container"
      style="margin-top: 0">

        <ttrack
            v-for="(track, id) in tracks"
            :key="id"
            :title="track.title"
            :time="track.time"
            :played="track.played"
            :selected="track.selected"
            @click="trackClick($event, track, id)">
        </ttrack>

    </div>

    <div
      ref="lightBottom"
      class="light light_bottom"></div>

</div>
</template>


<script>
import { eventEmitter } from "../main";
import track from "./Track";

export default {
  components: {
    ttrack: track
  },

  data() {
    return {
      tracks: [],
      selectedTracks: [],
      playedTrack: {
          track: null,
          id: null
      },
      isRandomNext: false,
      isLoopCurrent: false
    };
  },

  methods: {

    // Проверка возможности прокрутки вверх
    isCanScrollTop() {
      return (this.tracks.length != 0) &&
             (parseInt(this.$refs.container.style.marginTop) != 0);
    },

    // Проверка возможности прокрутки вниз
    isCanScrollBottom() {
      return (this.$refs.trackList.scrollHeight - this.$refs.trackList.clientHeight) > 0;
    },

    mousemove() {
      if (this.isCanScrollTop()) {
        this.$refs.lightTop.classList.add('light_actived');
      } else {
        this.$refs.lightTop.classList.remove('light_actived');
        this.$refs.lightTop.classList.remove('light_far');
      }
      if (this.isCanScrollBottom()) {
        this.$refs.lightBottom.classList.add('light_actived');
      } else {
        this.$refs.lightBottom.classList.remove('light_actived');
        this.$refs.lightBottom.classList.remove('light_far');
      }
    },

    mouseleave() {
      this.$refs.lightTop.classList.remove('light_actived');
      this.$refs.lightTop.classList.remove('light_far');
      this.$refs.lightBottom.classList.remove('light_actived');
      this.$refs.lightBottom.classList.remove('light_far');
    },

    wheel(e) {
      // Скорость прокрутки
      let delta = 10;
      if (this.tracks.length === 0) return;
      let marginTop = parseInt(this.$refs.container.style.marginTop);
      if (e.deltaY > 0) {
        // вниз
        this.$refs.lightBottom.classList.add('light_far');
        this.$refs.lightTop.classList.remove('light_far');
        let diff = this.$refs.trackList.scrollHeight - this.$refs.trackList.clientHeight;
        if (diff < 0) {
          // "докрутка" до конца
          this.$refs.container.style.marginTop = `${diff}px`;
        } else if (diff > 0) {
          this.$refs.container.style.marginTop = `${marginTop - delta}px`;
        }
      } else if (marginTop != 0) {
        // вверх
        this.$refs.lightTop.classList.add('light_far');
        this.$refs.lightBottom.classList.remove('light_far');
        if (marginTop + delta > 0) {
          this.$refs.container.style.marginTop = 0;
        } else {
          this.$refs.container.style.marginTop = `${marginTop + delta}px`;
        }
      }
      // Подстветка прокрутки
      if (this.isCanScrollTop()) {
        this.$refs.lightTop.classList.add('light_actived');
      } else {
        this.$refs.lightTop.classList.remove('light_actived');
        this.$refs.lightTop.classList.remove('light_far');
      }
      if (this.isCanScrollBottom()) {
        this.$refs.lightBottom.classList.add('light_actived');
      } else {
        this.$refs.lightBottom.classList.remove('light_actived');
        this.$refs.lightBottom.classList.remove('light_far');
      }
    },

    dragleave() {
      this.$refs.emptyText.classList.remove("track-list__empty-text_strong");
    },

    dragenter() {
      this.$refs.emptyText.classList.add("track-list__empty-text_strong");
    },

    // Удаление выделенных трэков
    deleteSelected() {
      this.tracks = this.tracks.filter(track => !track.selected);
      this.selectedTracks = [];
      if (this.tracks.length === 0) {
        // Показ текста при пустом списке
        this.$refs.emptyText.style.display = "";
        this.$refs.emptyText.classList.remove("track-list__empty-text_strong");
        this.$refs.trackList.classList.add("track-list_c");
      }
    },

    prev() {
        // Если трэк незациклен
        if (!this.isLoopCurrent) {
            let id = 0;
            // Если трэки случайные
            if (this.isRandomNext) {
                id = Math.floor(Math.random() * this.tracks.length);
            } else {
                if (this.playedTrack.id == 0) {
                    id = this.tracks.length - 1;
                } else {
                    id = this.playedTrack.id - 1;
                }
            }
            this.setPlayed(id);
        }
        this.$emit("selectplay", this.playedTrack);
    },

    next() {
        // Если трэк незациклен
        if (!this.isLoopCurrent) {
            let id = 0;
            // Если трэки случайные
            if (this.isRandomNext) {
                id = Math.floor(Math.random() * this.tracks.length);
            } else {
                if (this.playedTrack.id == this.tracks.length - 1) {
                    id = 0;
                } else {
                    id = this.playedTrack.id + 1;
                }
            }
            this.setPlayed(id);
        }
        this.$emit("selectplay", this.playedTrack);
    },

    getPlayed() {},

    // Добавление перетаскиваемых файлов
    addDropFiles(files) {
      // Скрытие текста
      this.$refs.emptyText.style.display = "none";
      this.$refs.trackList.classList.remove("track-list_c");
      // Добавление файлов в список и исключение повторных
      for (let i = 0; i < files.length; ++i) {
        if (this.isFileExists(files[i].name)) {
          continue;
        }
        this.getAudiotrackTime(files[i]).then(time =>
          this.addAudiotrack(files[i].name, time, files[i])
        );
      }
    },

    // Проверка, добавлен ли уже файл с заданным именем
    isFileExists(fileName) {
      for (let i = 0; i < this.tracks.length; ++i) {
        if (this.tracks[i].file.name == fileName) {
          return true;
        }
      }
      return false;
    },

    // Снятие всех выделений
    clearAllSelected() {
      for (let track of this.tracks) {
        track.selected = false;
      }
      this.selectedTracks = [];
    },

    // Добавление трэка в список
    addAudiotrack(name, time, file) {
      let track = {
        title: name,
        time,
        selected: false,
        played: false,
        file
      };
      this.tracks.push(track);
    },

    // Получение временной продолжительности трэка
    getAudiotrackTime(file) {
      return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = file => {
          let audio = new Audio(file.target.result);
          audio.oncanplay = () => {
            resolve(this.formatTime(audio.duration));
          };
        };
        fr.readAsDataURL(file);
      });
    },

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

    // Клик по треку
    trackClick(e, track, id) {
      if (e.ctrlKey) {
        // Выделение трека как выбранного
        if (track.played) {
          this.clearPlayed();
          eventEmitter.$emit("stop-equalizer");
        }
        track.selected = !track.selected;
        if (track.selected) {
          this.selectedTracks.push(track);
        } else {
          this.selectedTracks.pop(this.selectedTracks.indexOf(track));
        }
      } else {
        this.clearAllSelected();
        // Выделение как проигрываемого
        if (this.playedTrack.track) {
          this.playedTrack.track.played = false;
        }
        track.played = true;
        this.playedTrack.track = track;
        this.playedTrack.id = id;
        this.$emit("selectplay", this.playedTrack);
      }
    },

    // Убрать выделение с проигрываемого трека
    clearPlayed() {
      this.$emit("clearplay");
      this.playedTrack.track.played = false;
      this.playedTrack = {
          track: null,
          id: null
      };
    },

    // Задать проигрываемый трек
    setPlayed(id) {
      this.clearAllSelected();
      this.playedTrack.track.played = false;
      this.playedTrack.track = this.tracks[id];
      this.playedTrack.track.played = true;
      this.playedTrack.id = id;

      let clientHeight = this.$refs.trackList.clientHeight;
      let trackSize = 36;
      let offsetTop = trackSize * id + trackSize;
      this.$refs.container.style.marginTop = `-${Math.trunc(offsetTop / clientHeight) * clientHeight}px`;
    },

    // Переключатель случайного воспроизведения
    toggleRadomNext() {
      this.isRandomNext = !this.isRandomNext;
    },

    // Включение зацикливания трэка
    toggleLoopCurrent() {
      this.isLoopCurrent = !this.isLoopCurrent;
    },

    // Скрыть/показать список треков
    toggleVisibility() {
        console.log("toggleVisibility");
    },

  },

  mounted() {
    eventEmitter.$on("track-list-deleteSelected", this.deleteSelected);
    eventEmitter.$on("track-list-toggleRandomNext", this.toggleRadomNext);
    eventEmitter.$on("track-list-toggleLoopCurrent", this.toggleLoopCurrent);
    eventEmitter.$on("track-list-prev", this.prev);
    eventEmitter.$on("track-list-next", this.next);
    eventEmitter.$on('track-list-toggleVisibility', this.toggleVisibility);
  },

  updated() {
    if ((this.tracks.length !== 0) && this.playedTrack.track) {
      this.playedTrack.id = this.tracks.indexOf(this.playedTrack.track);
    }
  },
};
</script>


<style scoped lang="scss">
@import "../color-schema.scss";
@import "../base.scss";

.track-list {
  position: relative;
  height: 100%;
  min-width: 300px;
  background-color: $color-main-front;
  overflow: hidden;

  &_c {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .track-list__empty-text {
    display: flex;
    align-items: center;
    font-family: Sans;
    font-size: 1.2rem;
    color: darken($color-main-back, 2);
    animation-name: empty-text-move-ease;
    animation-duration: 2s;
    animation-timing-function: $animation-timing-function;
    animation-iteration-count: infinite;
    animation-direction: alternate;

    &_strong {
      animation-name: empty-text-move-normal;
      animation-duration: 0.5s;
    }

    &::before {
        content: "";
        display: inline-block;
        margin-right: 10px;
        width: 30px;
        height: 30px;
        background-image: url("../img/gray-pic.svg");
        background-size: cover;
    }
  }
}

.light {
  position: absolute;
  right: 0;
  width: 100%;
  height: 4px;
  background-color: transparent;
  animation-duration: $animation-duration;
  animation-timing-function: $animation-timing-function;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  &_top {
    top: 0;
  }

  &_bottom {
    bottom: 0;
  }

  &_actived {
    animation-name: light-actived;
  }

  &_far {
    animation-name: light-actived, light-far;
  }
}

@keyframes empty-text-move-ease {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(15deg);
    }
}

@keyframes empty-text-move-normal {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(45deg);
    }
}

@keyframes light-actived {
  from {
    background-color: transparent;
  }
  to {
    background-color: $color-element-1-active;
  }
}

@keyframes light-far {
  from {
    box-shadow: 0;
  }
  to {
    box-shadow: 0 0px 50px 0px $color-element-1-active;
  }
}
</style>
