import Vue from "vue";
import Vuex from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8000/api/user",
});
const instancePost = axios.create({
  baseURL: "http://localhost:8000/api/post",
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    user: {
      userId: -1,
      token: "",
    },
    userInfos: {
      name: "",
      surname: "",
      email: "",
      bio: "",
      picture: "",
    },
    postInfos: {
      title: "",
      content: "",
      createdAt: "",
      author: {
        surname: "",
        name: "",
      },
    },
  },
  getters: {},
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    postInfos: function (state, postInfos) {
      state.postInfos = postInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");

      return new Promise((resolve, reject) => {
        instance
          .post("/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "");

            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");

            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      instance
        .get(`/${user.userId}`)
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },
    getPosts: ({ commit }) => {
      instancePost
        .get("/")
        .then(function (response) {
          commit("postInfos", response.data);
        })
        .catch(function () {});
    },
  },
  modules: {},
});
