<script setup lang="ts">
import { useWallController } from "../service/WallControllerService";
const {sendInteractionToWallServer,wallScreenState} = useWallController();

</script>
<template>
  <div class="wallcontrollerfooter custombuttons">
   <button
      class="button is-light"
      v-for="(buttoncustom, i) in wallScreenState.customButtons"
      :key="i"
      @click="sendInteractionToWallServer(buttoncustom, 'custombutton')"
    >
      {{ buttoncustom }}
    </button>
  </div>
</template>
<style scoped>
.wallcontrollerfooter {
  background-color: var(--beige);
  position: fixed;
  width: 100%;
  height: var(--footer-height);
  left: 0;
  bottom: 0;
}
.custombuttons {
  overflow-x: scroll;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap:2vw;
}
</style>