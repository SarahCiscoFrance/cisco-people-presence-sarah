<template>
  <span class="map-container">
    <h1
      class="content-description"
    >First floor of the Cisco building of Issy-les-Moulineaux in France</h1>
    <svg viewBox="0 0 1069.4 558" style="height: 100% !important; width: 100% !important">
      <mapBackground></mapBackground>
      <g v-for="codec in codecs" :key="codec.macAddress">
        <g>
          <circle
            class="codec-circle first-circle"
            :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'codec-circle-red' : 'codec-circle-green']"
            :cx="codec.coordinates.x"
            :cy="codec.coordinates.y"
          ></circle>
        </g>
        <g>
          <circle
            class="codec-circle second-circle"
            :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'codec-circle-red' : 'codec-circle-green']"
            :cx="codec.coordinates.x"
            :cy="codec.coordinates.y"
          ></circle>
        </g>
        <g>
          <circle
            class="codec-circle third-circle"
            :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'codec-circle-red' : 'codec-circle-green']"
            :cx="codec.coordinates.x"
            :cy="codec.coordinates.y"
          ></circle>
        </g>
        <g class="codec-circle-group" @click="openCodec(codec)">
          <title>{{ codec.name }}</title>
          <circle
            class="codec-circle"
            :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'codec-circle-red' : 'codec-circle-green']"
            :cx="codec.coordinates.x"
            :cy="codec.coordinates.y"
            r="15"
          ></circle>
          <text
            class="circle-count"
            :x="codec.coordinates.x"
            :y="codec.coordinates.y"
            text-anchor="middle"
            dy="0.6rem"
          >{{ codec.peopleCount > 0 ? codec.peopleCount : 0 }}</text>
        </g>
      </g>
    </svg>
    <!-- <div class="codec-name" ref="codecName">
      <p>Kandinsky Room 70 Dual</p>
    </div>
    <g
      class="codec-circle-group"
      :ref="codecCircleRef(codec)"
      @mouseover="mouseOverCodecCircle(codec)"
      @mouseout="mouseOutCodecCircle(codec)"
    ></g>-->
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import MapBackground from "./MapBackground";

export default {
  name: "Map",
  components: {
    mapBackground: MapBackground
  },
  computed: {
    codecCircleRef() {
      return codec => `codecCircle${codec.name}`.replace(/\s/g, "");
    },
    ...mapGetters(["codecs"])
  },
  methods: {
    openCodec(codec) {
      this.$router.push({ path: `/codec/${codec.macAddress}` });
    }
    /* mouseOverCodecCircle(codec) {
      const textRef = `codecCircle${codec.name}`.replace(/\s/g, "");
      const ref = this.$refs[textRef];

      const circlePosition = ref[0].getBoundingClientRect();

      this.$refs.codecName.style.top = `${circlePosition.top - 100}px`;
      this.$refs.codecName.style.left = `${circlePosition.left}px`;
      this.$refs.codecName.style.opacity = 1;
    },
    mouseOutCodecCircle(codec) {
      const textRef = `codecCircle${codec.name}`.replace(/\s/g, "");
      const ref = this.$refs[textRef];

      const circlePosition = ref[0].getBoundingClientRect();
      this.$refs.codecName.style.opacity = 0;
    } */
  }
};
</script>

<style>
.map-container {
  display: flex;
  flex: 1;

  height: 100%;

  margin: 0.75rem;
}

.codec-circle {
  transition: all 0.3s ease-in;
}

.codec-circle-red {
  fill: #f5473e;
}

.codec-circle-green {
  fill: #43a942;
}

.circle-count {
  font-size: 1.6rem;
  fill: #ffffff;
}

@media only screen and (max-width: 93.75em) {
  /* 1500px */
  .circle-count {
    transform: translateY(0.1rem);
    font-size: 2rem;
  }
}

.codec-circle-group {
  cursor: pointer;
}

.codec-circle-group:hover .codec-circle {
  fill: #049fd9;
}

.first-circle,
.second-circle,
.third-circle {
  animation: pulse-me 4s ease-out infinite;
}

.second-circle {
  animation-delay: 1s;
}

.third-circle {
  animation-delay: 2s;
}

@keyframes pulse-me {
  0% {
    r: 0;
    opacity: 0;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    r: 30;
    opacity: 0;
  }
}

/* .codec-name {
  position: absolute;

  opacity: 0;

  transition: opacity 0.3s ease-in;

  background-color: #049fd9;
  color: #ffffff;

  font-weight: normal;
  font-size: 1.6rem;

  padding: 1rem 1.5rem;
  border-radius: 10px;
} */
</style>
