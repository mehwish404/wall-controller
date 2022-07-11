<script setup lang="ts">
import { ref } from "vue";
import { TextInputInteractionControl } from "../service/interactionWallApp/InteractionControls";
import { InteractionType } from "../service/interactionWallApp/InteractionToWallApp";

const text = ref("");

function submit() {
  InteractionType.TEXT.values![0].value = text.value.trimEnd();
  TextInputInteractionControl.sendInteraction(InteractionType.TEXT);
  text.value = "";
}
</script>

<template>
  <div>
    <div class="field">
      <label class="label">Antwort</label>
      <div class="control">
        <input v-model="text" class="input" type="text" placeholder="Text Eingabe" />
      </div>
    </div>
    <div class="control">
      <button class="button is-light" @click="submit">
        Einreichen
        <span class="icon is-small" style="color: grey; margin-left: 2vw">
          <i class="fas fa-paper-plane"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
