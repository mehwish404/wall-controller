<script setup lang="ts">
import { ref, computed } from "vue";
import { useWallController } from "../service/WallControllerService";

const { userSessionData, sendName } = useWallController();
const submited = ref(false);
const name = ref("");
const settedName = computed(() => userSessionData.value.customName);

function submit() {
  submited.value = true;
  if (name.value) {
    sendName(name.value.trimEnd());
  }
}
</script>
<template>
  <article id="abfrage" class="panel" v-if="!submited && !settedName">
    <p class="panel-heading">Playername Angabe</p>
    <p class="control panel-block">
      <input v-model="name" class="input" type="text" placeholder="Name" />
    </p>
    <div class="panel-block buttons">
      <button class="button is-success is-light" @click="submit">Name einreichen</button>
      <button class="button is-warning is-light" @click="submited = true">
        Ich bleibe anonym
      </button>
    </div>
  </article>
</template>
<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;
}
.input {
  width: 50%;
}
.control {
  justify-content: center;
}
</style>
