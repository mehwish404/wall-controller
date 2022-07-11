<script setup lang="ts">
import { computed } from "vue";
import { useWallController } from "../service/WallControllerService";
import { WallScreenControl } from "../service/interactionWallScreen/WallScreenControl";

const { sendInteractionToWallServer, wallScreenState } = useWallController();
const paused = computed(() => wallScreenState.value.paused);
const url = "control";
</script>

<template>
  <div class="d-flex flex-row rounded-bg py-3 px-3 justify-content-center">
    <i
      class="fas fa-chevron-left px-4 control-icon"
      @click="sendInteractionToWallServer(JSON.stringify(WallScreenControl.PREV), url)"
    ></i>
    <i
      v-if="!paused"
      class="fas fa-pause px-4 control-icon"
      @click="sendInteractionToWallServer(JSON.stringify(WallScreenControl.PAUSE), url)"
    ></i>
    <i
      v-if="paused"
      class="fas fa-play px-4 control-icon"
      @click="sendInteractionToWallServer(JSON.stringify(WallScreenControl.PLAY), url)"
    ></i>
    <i
      class="fas fa-chevron-right px-4 control-icon"
      @click="sendInteractionToWallServer(JSON.stringify(WallScreenControl.NEXT), url)"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/variables.scss";
@import "../assets/main.scss";
div.rounded-bg {
  background: var(--dark-grey);
  border-radius: 5vw;
  min-width: 65%;
  height: auto;
}

i.control-icon {
  font-size: var(--normal-font-size);
  color: #2e2e2e;
}
</style>
