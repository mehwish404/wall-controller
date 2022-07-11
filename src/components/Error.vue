<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<template>
  <div id="errorview">
    <div class="emoji">
      <i class="far fa-frown"></i>
    </div>
    <div class="messages">
      <h1 class="heading">Ohh...</h1>
      <p class="messagecontent">{{ props.message }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../assets/variables.scss";
@import "../assets/main.scss";
.emoji {
  left: 50%;
  padding-top: 10%;
  margin-bottom: -20%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 40vw;
  height: 40vw;
  position: relative;
}

i {
  margin-top: 45%;
  font-size: var(--giant-font-size);
}

.messages {
  padding-top: 4%;
  padding-left: 5vw;
  padding-right: 5vw;
  text-align: center;
}

.heading {
  font-size: var(--giant-font-size);
  font-weight: 600;
  margin-bottom: 1vh;
  color: var(--darkgrey);
  text-transform: uppercase;
  text-align: center;
}

.messagecontent {
  font-family: "Quicksand", sans-serif;
  font-weight: 400;
  font-size: var(--big-font-size);
  padding-left: 5vw;
  padding-right: 5vw;
}
</style>
