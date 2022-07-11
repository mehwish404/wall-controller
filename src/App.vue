<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useWallController } from "./service/WallControllerService";
import ChangeWallApp from "./components/ChangeWallApp.vue";
import { useRoute } from "vue-router";
import Error from "./components/Error.vue";
import AppMenuVue from "./components/AppMenu.vue";
import NameQueryVue from "./components/NameQuery.vue";
import { allInteractionControls } from "./service/interactionWallApp/InteractionControls";
import Footer from "./components/Footer.vue";
const {
  checkToken,
  clearStore,
  wallControllerState,
  userSessionData,
  wallState,
} = useWallController();

//to check user session
const location = useRoute();
const allowed = computed(() => wallControllerState.value.allowed);
const reminder = computed(() => wallControllerState.value.remindInactivity);

const admin = computed(() => userSessionData.value.wallControl);
const errormessage = ref("Leider ist dein Qr-Code nicht mehr gültig");
const searchQuery = computed(() => location.query.token);

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

onMounted(async () => {
  if (isMobile) {
    watch(searchQuery, (newSearchQuery) => {
      if (newSearchQuery != null) {
        if (!allowed.value) {
          checkToken(newSearchQuery.toString());
        }
      }
    });
  } else {
    errormessage.value = "Der Wall-Controller ist nicht für dein Endgerät geeignet.";
  }
});
</script>
<template>
  <div class="phone">
    <div class="top">
      <p class="headingphone">Wall Controller</p>
      <p class="subheading" v-if="allowed">User: {{ userSessionData.name }}</p>
      <p
        class="subheading"
        v-if="allowed && userSessionData.group > 0 && wallState.groups > 0"
      >
        User: {{ userSessionData.name }} Group: {{ userSessionData.group }}
      </p>
    </div>
    <div v-if="allowed" class="controller">
      <div class="notification is-danger" v-if="reminder">
        <button class="delete"></button>
        Erinnerung: Du nutzt dein Wall-Controller nicht mehr so aktiv! Bei wietere
        Inaktivität endet deine Session in Kürze
      </div>
      <div class="off">
        <i @click="clearStore(true)" class="fas fa-power-off active"></i>
        <span class="label">Power</span>
      </div>
      <div
        class="d-flex align-items-center flex-column mt-4 justify-content-between px-6 block"
      >
        <ChangeWallApp v-if="admin" />
      </div>
      <AppMenuVue v-if="admin"></AppMenuVue>
      <NameQueryVue></NameQueryVue>
      <div
        v-if="wallControllerState.showNotification"
        class="notification is-warning is-light"
      >
        {{ wallControllerState.notificationText }}
      </div>
      <div class="control" v-if="wallState.currentInteractionControls !== undefined">
        <div v-for="(interactioncontrol, index) in wallState.currentInteractionControls">
          <component
            :is="
              allInteractionControls.find((i) => i.name == interactioncontrol.name)
                ?.component
            "
          />
        </div>
      </div>
    </div>
    <h1 v-if="!allowed" class="controller">
      <Error :message="errormessage" />
    </h1>

    <Footer
      v-if="
        wallState.customButtons != null && wallState.customButtons.length > 0 && allowed
      "
    />
  </div>
</template>

<style lang="scss">
@import "assets/variables.scss";
@import "assets/main.scss";

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

button {
  margin-left: 1.5vw;
}
.phone {
  display: block;
}

.block:not(:last-child) {
  margin-bottom: 1.5rem;
}

.top {
  background-color: #b8aeab;
  position: fixed;
  width: 100%;
  height: auto;
  left: 0;
  top: 0;
}

.apps {
  float: center;
}

.controller {
  padding-top: 20%;
}

.thewall {
  width: 100vw;
  overflow: hidden;
  white-space: normal !important;
}

.headingphone {
  font-style: "Light";
  color: var(--red);
  text-align: center;
  padding-top: 1vh;
  font-size: var(--big-font-size);
}

.subheading {
  font-style: "Light";
  color: var(--red);
  float: center;
  font-size: var(--normal-font-size);
  text-align: center;
}

.fa-power-off {
  color: #742b32;
  font-size: 4vw;
}
.control {
  margin-left: 2vh;
  margin-right: 2vh;
}
</style>
