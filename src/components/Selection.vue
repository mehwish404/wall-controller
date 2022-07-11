<script setup lang="ts">
import { SelectionInteractionControl } from "../service/interactionWallApp/InteractionControls";
import { ref } from "vue";
import { InteractionWallAppType } from "../service/interactionWallApp/InteractionFromWallApp";
import { InteractionType } from "../service/interactionWallApp/InteractionToWallApp";

SelectionInteractionControl.setOnInteraction(setOptions);
const options = ref([] as string[]);
const multiple = ref(false);
const selectionSubmited = ref(false);
const showNotification = ref(false);
function shuffle(options: string[]) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function setOptions(interaction: InteractionWallAppType) {
  if (interaction.name == InteractionWallAppType.OPTIONS.name) {
    options.value = shuffle(interaction.values![0].value.split(","));
    multiple.value = interaction.values![1].value == "true" ? true : false;
    selectionSubmited.value = false;
  }
}

function sendSlection() {
  let optionsElements = multiple.value
    ? document.getElementsByClassName("checkbox")
    : document.getElementsByClassName("radio");
  const selected = [] as string[];
  const optionsElementss = Array.from(optionsElements) as Array<HTMLElement>;
  optionsElementss.forEach((element) => {
    const input = element.firstChild as HTMLInputElement;
    if (input.checked == true) {
      selected.push(element.innerText.trimStart());
    }
  });
  if (selected.length < 1) {
    showNotification.value = true;
  } else {
    selectionSubmited.value = true;
    InteractionType.SELECTED.values![0].value = selected.toString();
    SelectionInteractionControl.sendInteraction(InteractionType.SELECTED);
  }
}
</script>

<template>
  <div>
    <div class="control" v-if="!selectionSubmited">
      <div class="notification is-warning" v-if="showNotification">
        <button class="delete" @click="showNotification = false"></button>
        Du hast keine Auswahl getroffen!
      </div>
      <div v-if="!multiple" class="options">
        <div v-for="(option, i) in options" :key="i">
          <label class="radio rows form-control" :key="i">
            <input
              type="radio"
              class="rd"
              name="answer"
              style="margin-right: 3vw; margin-left: 1vw"
            />
            {{ options[i] }}
          </label>
        </div>
      </div>
      <div v-if="multiple" class="options">
        <div v-for="(option, i) in options" :key="i">
          <label class="checkbox rows form-control" :key="i">
            <input
              type="checkbox"
              class="ck"
              name="answer"
              style="margin-right: 3vw; margin-left: 1vw"
            />
            {{ options[i] }}
          </label>
        </div>
      </div>
      <button class="button is-light" @click="sendSlection" v-if="options.length > 0">
        Auswahl einreichen
        <span class="icon is-small" style="color: grey; margin-left: 2vw">
          <i class="fas fa-paper-plane"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.rows {
  text-align: left;
  padding: 4vw;
  margin-bottom: 2vw;
  background: rgba(184, 174, 171, 0.4);
  color: var(--red);
  font-family: var(--font-family);
}

.options {
  margin-top: 2vw;
  margin-bottom: 4vw;
}
</style>
