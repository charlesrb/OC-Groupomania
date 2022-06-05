<template>
  <div class="navbar">
    <img class="logo-inline" src="../assets/logo-inline.svg" />
    <ul class="navbar__list">
      <li><router-link to="/home">Fil d'actualité</router-link></li>
      <li><router-link to="/profile">Profil</router-link></li>
      <li><router-link to="/membres">Membres</router-link></li>
      <li>
        <router-link to="/" @click="logout()">Se déconnecter</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/store";

export default {
  /* eslint-disable */
  name: "Nav",
  methods: {
    logout() {
      store.state.isLogged = false;
      this.$router.push("/");
      localStorage.clear();
      console.log("user déconnecté");
    },
  },
};
</script>

<style scoped>
.logo-inline {
  width: 200px;
  margin-left: 20px;
}
.router-link-active {
  color: #fd2d01;
  font-weight: 500;
  text-decoration: none;
}
a {
  font-weight: 400;
  color: black;
  text-decoration: none;
}
a:hover {
  color: #fd2d01;
}
.navbar {
  height: 50px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.navbar__list {
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-content: center;
  list-style: none;
  margin-right: 20px;
  margin-top: 10px;
  gap: 20px;
}
</style>
