import Vue from "vue";
import Router from "vue-router";
import Map from "./components/Map";
import Codec from "./components/Codec";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/map",
      name: "map",
      component: Map
    },
    {
      path: "/codec/:mac",
      name: "codec",
      component: Codec,
      props: true
    },
    { path: "/*", redirect: "/map" }
  ]
});
