<script setup lang="ts">
import { computed, onMounted } from "vue";
import { SwipeInteractionControl } from "../service/interactionWallApp/InteractionControls";
import { InteractionType } from "../service/interactionWallApp/InteractionToWallApp";

onMounted(() => {
  let touchstartX = 0;
  let touchendX = 0;
  let touchstartY = 0;
  let touchendY = 0;
  const slider = document.getElementById("swipesection");
  slider!.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
  });

  slider!.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    const swipe = handleGesture();
    if (swipe != null) {
      SwipeInteractionControl.sendInteraction(swipe);
    }
  });

  function handleGesture() {
    const diffX = computed(() => touchstartX - touchendX);
    const diffY = computed(() => touchstartY - touchendY);
    const { max, abs } = Math;
    const isThresholdExceeded = computed(
      () => max(abs(diffX.value), abs(diffY.value)) >= 50
    );
    if (!isThresholdExceeded.value) {
      return null;
    }
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0
        ? setInteractionValues(InteractionType.SWIPE_LEFT)
        : setInteractionValues(InteractionType.SWIPE_RIGHT);
    } else {
      return diffY.value > 0
        ? setInteractionValues(InteractionType.SWIPE_UP)
        : setInteractionValues(InteractionType.SWIPE_DOWN);
    }
  }
  function setInteractionValues(interaction: InteractionType) {
    interaction.values![0].value = touchstartX.toString();
    interaction.values![1].value = touchendX.toString();
    interaction.values![2].value = touchstartY.toString();
    interaction.values![3].value = touchendY.toString();
    return interaction;
  }
});
</script>

<template>
  <div class="tile is-parent is-vertical">
    <article class="tile is-child notification" id="swipesection">
      <div class="content">
        <p>Swipe here</p>
      </div>
    </article>
  </div>
</template>
<style scoped>
#swipesection {
  background-color: #b8aeab;
  opacity: 0.6;
}

.content {
  height: 15vh;
  border-radius: 2vw;
  line-height: 15vh;
}

p {
  font-size: var(--normal-font-size);
  text-align: center;
  vertical-align: middle;
}
</style>
