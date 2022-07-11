<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VideoInteractionControl } from "../service/interactionWallApp/InteractionControls";
import { InteractionWallAppType } from "../service/interactionWallApp/InteractionFromWallApp";
import { InteractionType } from "../service/interactionWallApp/InteractionToWallApp";

const percent = ref(0);
const paused = ref(false);
VideoInteractionControl.setOnInteraction(setValues);

function setValues(interaction: InteractionWallAppType) {
  switch (interaction.name) {
    case InteractionWallAppType.PROGRESS.name: {
      percent.value = parseInt(interaction.values![0].value);
      if (percent.value >= 100) {
        percent.value = 0;
      }
      break;
    }
    case InteractionWallAppType.VIDEOPAUSE.name: {
      paused.value = true;
      break;
    }
    case InteractionWallAppType.VIDEOPLAY.name: {
      paused.value = false;
      break;
    }
    case InteractionWallAppType.VIDEOSPEED.name: {
      const selection = document.getElementById("selectionspeed")! as HTMLSelectElement;
      const option = selection.options.namedItem(
        interaction.values![0].value
      ) as HTMLOptionElement;
      selection.value = option.value;
      break;
    }
  }
}

function play() {
  paused.value = false;
  VideoInteractionControl.sendInteraction(InteractionType.VIDEOPLAY);
}

function pause() {
  paused.value = true;
  VideoInteractionControl.sendInteraction(InteractionType.VIDEOPAUSE);
}

function stop() {
  paused.value = true;
  VideoInteractionControl.sendInteraction(InteractionType.VIDEOSTOP);
}

function next() {
  paused.value = false;
  VideoInteractionControl.sendInteraction(InteractionType.VIDEONEXT);
}
function back() {
  paused.value = false;
  VideoInteractionControl.sendInteraction(InteractionType.VIDEOBACK);
}

function setSpeed(event: Event) {
  const target = event.target as HTMLInputElement;
  InteractionType.VIDEOSPEED.values![0].value = target.value;
  VideoInteractionControl.sendInteraction(InteractionType.VIDEOSPEED);
}
onMounted(() => {
  const progressbar = document.getElementById("bar")!;
  progressbar.addEventListener("click", changeVideoTime);
  function changeVideoTime(e: any) {
    var x = e.pageX - progressbar.offsetLeft;
    percent.value = (x * 100) / progressbar.offsetWidth;
    InteractionType.VIDEOPROGRESS.values![0].value = percent.value.toString();
    VideoInteractionControl.sendInteraction(InteractionType.VIDEOPROGRESS);
  }
});
</script>
<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="row">
          <i class="column fa fa-step-backward" @click="back"></i>
          <i class="column fa fa-stop" @click="stop"></i>
          <i class="column fa fa-play" v-if="paused" @click="play"></i>
          <i class="column fa fa-pause" v-else @click="pause"></i>
          <i class="column fa fa-step-forward" @click="next"></i>
        </div>
      </div>
      <progress id="bar" class="progress is-small is-circle" :value="percent" max="100">
        0%
      </progress>
      <div class="select">
        <select id="selectionspeed" @change="setSpeed($event)">
          <option id="0.25" value="0.25">0.25</option>
          <option id="0.5" value="0.5">0.5</option>
          <option id="1.0" value="1.0" selected>1.0</option>
          <option id="1.5" value="1.5">1.5</option>
          <option id="2.0" value="2.0">2.0</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 3vw;
  margin-right: 3vw;
}

i {
  font-size: 4vw;
  margin-left: 3vw;
  margin-right: 3vw;
}

.select {
  align-self: center;
}
</style>
