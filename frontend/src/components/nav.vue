<template>
  <div>
    <div class="nav-menu">
      <span @click="showMenu()"><i class="fas fa-bars"> </i></span>
      <div
        class="nav-content"
        :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'"
      >
        <img class="logo-inline" src="../assets/logo-inline.svg" />

        <ul class="nav-items">
          <li><router-link to="/home">Fil d'actualité</router-link></li>
          <li><router-link to="/profile">Profil</router-link></li>
          <li><router-link to="/membres">Membres</router-link></li>
          <li>
            <router-link to="/" @click="logout()">Se déconnecter</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  /* eslint-disable */
  name: "Nav",
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    logout() {
      store.state.isLogged = false;
      this.$router.push("/");
      localStorage.clear();
    },
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 769px) {
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
  .nav-menu {
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
  .nav-items {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-content: center;
    list-style: none;
    margin-right: 20px;
    gap: 20px;
  }

  span {
    display: none;
  }
  .nav-content {
    display: flex;
    justify-content: space-around;
    padding: 10px 30px;
    align-items: center;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .logo-inline {
    width: 200px;
    margin-bottom: 20px;
    padding-top: 20px;
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

  .nav-menu {
    height: 50px;
    width: 100%;
    background-color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    color: #fd2d01;
  }
  .nav-menu span {
    margin-left: 20px;
  }
  .open-menu {
    opacity: 1;
    height: 200px;
  }
  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }
  .nav-content {
    display: flex;
    flex-direction: column;
    z-index: 100;
    position: relative;
    top: 10px;
    transition: all 0.2s ease-out;
    background-color: white;
    align-items: center;
    margin-bottom: 20px;
  }
  .nav-items {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    align-items: center;
  }
  i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
  }
}
</style>
