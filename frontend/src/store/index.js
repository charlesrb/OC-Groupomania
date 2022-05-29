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

export default Vuex.createStore({
  state: {
    status: "",
    user: user,
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
    createPost: {
      title: "",
      content: "",
      createdAt: "",
      author: {
        surname: "",
        name: "",
      },
    },
    getPosts: {
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
    createPost: function (state, createPost) {
      state.createPost = createPost;
    },
    getPosts: function (state, postInfos) {
      state.postInfos = postInfos;
    },
    modifyAccount: function (state, userInfos) {
      state.userInfos = userInfos;
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
    modifyAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance
          .put(`/${user.userId}`, userInfos)
          .then(function (response) {
            commit("userInfos", "");

            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    deleteUser: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance
          .delete(`/${user.userId}`)
          .then(function (response) {
            commit("userInfos", "");
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    createPost: ({ commit }, createPost) => {
      return new Promise((resolve, reject) => {
        instancePost
          .post("/", createPost)
          .then(function (response) {
            commit("postInfos", response.data);

            resolve(response);
          })
          .catch(function (error) {
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
