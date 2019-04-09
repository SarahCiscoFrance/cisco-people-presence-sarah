import Vue from "vue";
import Vuex from "vuex";
import { API } from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    codecs: []
  },
  mutations: {
    setCodecs(state, codecs) {
      state.codecs = codecs;
    },
    updateCodec(state, codec) {
      for (let index in state.codecs) {
        if (state.codecs[index].macAddress === codec.macAddress) {
          Vue.set(state.codecs, index, codec);
        }
      }
    }
  },
  actions: {
    SOCKET_newAnalytic({ commit }, data) {
      commit("updateCodec", data);
    },
    getAllCodecs({ commit }) {
      API.get("/codec").then(response => {
        commit("setCodecs", response.data.codecs);
      });
    },
    getCodec({ commit }, mac) {
      return API.get(`/codec/${mac}`);
    },
    getCodecHistory({ commit }, { codecMacAddress, startDate, endDate }) {
      return API.post("/history/", { codecMacAddress, startDate, endDate });
    }
  },
  getters: {
    codecs: state => {
      return state.codecs;
    },
    codec: state => macAddress => {
      return state.codecs.find(codec => codec.macAddress === macAddress);
    }
  }
});
