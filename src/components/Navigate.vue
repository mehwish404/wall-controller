<script setup lang="ts">
import { InteractionType } from "../service/interactionWallApp/InteractionToWallApp";
import { NavigateInteractionControl } from "../service/interactionWallApp/InteractionControls";
</script>

<template>
  <div class="arrows">
    <table>
      <tr>
        <td></td>
        <td>
          <div
            class="arrowbutton disable-zoom-and-textselection-on-doubletap"
            @click="
              NavigateInteractionControl.sendInteraction(InteractionType.NAVIGATE_UP)
            "
          >
            <i class="fas fa-arrow-up"></i>
          </div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div
            class="arrowbutton disable-zoom-and-textselection-on-doubletap"
            @mousedown="
              NavigateInteractionControl.sendInteraction(InteractionType.NAVIGATE_LEFT)
            "
          >
            <i class="fas fa-arrow-left"></i>
          </div>
        </td>
        <td>
          <div
            class="arrowbutton disable-zoom-and-textselection-on-doubletap"
            @onmousedown="
              NavigateInteractionControl.sendInteraction(InteractionType.NAVIGATE_OK)
            "
          >
            Ok
          </div>
        </td>
        <td>
          <div
            class="arrowbutton disable-zoom-and-textselection-on-doubletap"
            @mousedown="
              NavigateInteractionControl.sendInteraction(InteractionType.NAVIGATE_RIGHT)
            "
          >
            <i class="fas fa-arrow-right"></i>
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div
            class="arrowbutton disable-zoom-and-textselection-on-doubletap"
            @click="
              NavigateInteractionControl.sendInteraction(InteractionType.NAVIGATE_DOWN)
            "
          >
            <i class="fas fa-arrow-down"></i>
          </div>
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.disable-zoom-and-textselection-on-doubletap {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  touch-action: manipulation;
}
.arrows {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}

#ok {
  border-radius: 150px;
}

.arrowbutton {
  box-sizing: border-box;
  line-height: 10vh;
  font-size: var(--big-font-size);
  text-align: center;
  width: 10vh;
  color: #555;
  margin: 1vh 1vh;
  height: 10vh;
  border-color: var(--beige);
  border-style: solid;
  text-shadow: 0 0.1vh 0.2vh #777, 0 0.7vh 0.9vh #f2f2f2;
  border-width: 0.1vh;
  border-radius: 1vh;
  background: -webkit-linear-gradient(top, #f9f9f9 0%, #b8aeab 90%, #b8aeab 100%);
  display: inline-block;
  transition: box-shadow 0.3s ease, transform 0.15s ease;
  box-shadow: 0 0 0.1vh #b8aeab, 0 0.1vh 0 #b8aeab, 0 1.2vh 0 #b8aeab, 0 1.4vh 2vh #b8aeab,
    0.3vh 0.1vh 1vh #b8aeab, -0.3vh 0.1vh 1vh #b8aeab, 0 1.5vh 16px #b8aeab;
}

.arrowbutton:hover,
:focus {
  box-shadow: 0 0 0.1vh #888, 0 0.1vh 0 #fff, 0 1vh 0 #c0c0c0,
    0 0.3vh 35px rgba(#444, 0.3), 0.3vh 0.3vh 1vh rgba(#444, 0.25),
    -0.3vh 0.3vh 1vh rgba(#444, 0.25), 0 7px 1vh rgba(#444, 0.1);
  transform: translateY(2px);
}

.arrowbutton:active {
  box-shadow: 0 0 0.1vh #888, 0 0.1vh 0 #fff, 0 0 0 #c0c0c0, 0 0px 3px rgba(#444, 0.15),
    0.3vh 0.3vh 1vh rgba(#444, 0.25), -0.3vh 0.3vh 1vh rgba(#444, 0.25),
    0 0px 1vh rgba(#444, 0.25);
  transform: translateY(1vh);
}
</style>
