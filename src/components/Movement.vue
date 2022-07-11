<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { MovementInteractionControl } from "../service/interactionWallApp/InteractionControls";
import { InteractionType } from "../service/interactionWallApp/InteractionToWallApp";
import { useWallController } from "../service/WallControllerService";

const { wallControllerState, setPermission } = useWallController();
const showModal = ref(true);
const message = ref("");
async function askpermission() {
  if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
    await (DeviceOrientationEvent as any).requestPermission();
    setPermission(false);
    showModal.value = false;
  }
}

function handleOrientation(event: any) {
  InteractionType.ORIENTATION.values![0].value = event.absolute;
  InteractionType.ORIENTATION.values![1].value = event.alpha;
  InteractionType.ORIENTATION.values![2].value = event.beta;
  InteractionType.ORIENTATION.values![3].value = event.gamma;
  MovementInteractionControl.sendInteraction(InteractionType.ORIENTATION);
}

function handleMotion(event: DeviceMotionEvent) {
  InteractionType.MOVEMENT.values![0].value = event.acceleration!.x?.toString() || "0";
  InteractionType.MOVEMENT.values![1].value = event.acceleration!.y?.toString() || "0";
  InteractionType.MOVEMENT.values![2].value = event.acceleration!.z?.toString() || "0";
  InteractionType.MOVEMENT.values![3].value =
    event.accelerationIncludingGravity!.x?.toString() || "0";
  InteractionType.MOVEMENT.values![4].value =
    event.accelerationIncludingGravity!.y?.toString() || "0";
  InteractionType.MOVEMENT.values![5].value =
    event.accelerationIncludingGravity!.z?.toString() || "0";
  InteractionType.MOVEMENT.values![6].value =
    event.rotationRate!.alpha?.toString() || "0";
  InteractionType.MOVEMENT.values![7].value = event.rotationRate!.beta?.toString() || "0";
  InteractionType.MOVEMENT.values![8].value =
    event.rotationRate!.gamma?.toString() || "0";
  InteractionType.MOVEMENT.values![9].value = event.interval?.toString();

  MovementInteractionControl.sendInteraction(InteractionType.MOVEMENT);
}

onMounted(() => {
  if (window.DeviceOrientationEvent == undefined) {
    message.value = "Leider unterstützt dein Endgerät die Bewegungssesnsoren nicht";
    showModal.value = false;
  }
  if (
    window.DeviceOrientationEvent != undefined &&
    (typeof (DeviceOrientationEvent as any).requestPermission !== "function" ||
      wallControllerState.value.movementPermissionNeeded == false)
  ) {
    showModal.value = false;
  }
  if (window.DeviceOrientationEvent != undefined) {
    window.addEventListener("deviceorientation", handleOrientation, false);
  }
  if (window.DeviceMotionEvent != undefined) {
    window.addEventListener("devicemotion", handleMotion, false);
  }
  onUnmounted(() => {
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
  });
});
</script>
<template>
  <div class="tile is-parent is-vertical">
    <article v-if="showModal == false" class="tile is-child">
      <div class="content">MOVEMENT</div>
    </article>
    <p>{{ message }}</p>
    <div class="modal is-active" v-if="showModal == true">
      <div class="modal-content"></div>
      <div class="box">
        <p>
          Um mit The Wall interagieren zu können, musst du erst die Bewegungsdaten
          erlauben
        </p>
        <button class="button is-success is-light" @click="askpermission">
          Erlauben
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  padding-left: 15%;
  padding-right: 15%;
}
p {
  font-size: 5vw;
}
.content {
  padding: 2vw;
  opacity: 0.8;
  background-color: rgba(184, 174, 171, 0.4);
}
</style>
