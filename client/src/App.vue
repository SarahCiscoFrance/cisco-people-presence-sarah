<template>
  <div id="app">
    <header class="header">
      <router-link to="/" class="router-link">
        <h1>Cisco people presence</h1>
      </router-link>
      <p class="header-description">
        Cisco Video Conferencing endpoints support advanced analytics capabilties
        <br>(including face & audio detection technologies), allowing a fine tracking and optimization of meeting room usage across a building.
      </p>
    </header>
    <div class="content">
      <transition name="component-fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getAllCodecs");
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; /* 1rem = 10px, 10px/16px = 62.5% */
}

@media only screen and (max-width: 93.75em) {
  /* 1500px */
  html {
    font-size: 50%;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.6;

  background-color: #ffffff;

  height: 100vh;

  color: #ffffff;
}

#app {
  display: flex;
  flex-direction: column;

  height: 100%;

  padding: 1.5rem;
}

.header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  font-size: 1.4rem;

  background-image: linear-gradient(to right, #097dbc, #049fd9);
  background-size: cover;
  background-repeat: no-repeat;

  color: white;

  padding: 2rem;

  border-radius: 1rem;
}

.header-description {
  text-align: right;
}

.router-link {
  color: white;
  text-decoration: none;
}

.content {
  position: relative;

  display: flex;
  flex: 1;

  background-color: #e8ebf1;

  padding: 0.75rem;
  margin-top: 1.5rem;

  border-radius: 1rem;
}

.content-description {
  position: absolute;

  background-image: linear-gradient(to right, #6cc04a, #abc233);
  background-size: cover;
  background-repeat: no-repeat;
  color: #ffffff;

  font-weight: normal;

  padding: 1rem 2rem;
  border-radius: 10px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
