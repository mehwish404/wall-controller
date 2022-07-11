<script setup lang="ts">
import "vueperslides/dist/vueperslides.css";
import { VueperSlides, VueperSlide } from "vueperslides";
import { computed, ref } from "vue";
import { useWallController } from "../service/WallControllerService";

const { wallScreenState, sendInteractionToWallServer } = useWallController();
const showmenu = ref(false);
const wallApps = computed(() => wallScreenState.value.wallAppsList);
</script>

<template>
  <nav class="panel">
    <p class="panel-heading has-icons-right" @click="showmenu = !showmenu">
      Wall-Apps
      <i class="fas fa-plus" v-if="!showmenu"></i>
      <i class="fas fa-minus" v-if="showmenu"></i>
    </p>
    <div class="panel-block" v-if="showmenu">
      <vueper-slides
        class="no-shadow apps"
        :infinite="true"
        :arrows="false"
        :visible-slides="3"
        :gap="4"
        :slide-ratio="1 / 4"
        :dragging-distance="100"
        :breakpoints="{ 800: { visibleSlides: 3, slideMultiple: 3 } }"
      >
        <vueper-slide
          style="background: #742b32; color: white; border-radius: 2vw; font-size: 3vw"
          v-for="i in wallApps"
          :key="i"
          :title="i.name"
          @click="sendInteractionToWallServer(JSON.stringify(i), 'showApp')"
        />
      </vueper-slides>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "../assets/variables.scss";
@import "../assets/main.scss";

i.fas.fa-plus,
i.fas.fa-minus {
  float: right;
  color: var(--red);
  font-size: var(--normal-font-size);
}
</style>
