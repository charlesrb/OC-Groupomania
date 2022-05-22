<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Voilà qui je suis</p>

    <h2>Prénom :</h2>
    <p>{{ user.surname }}</p>
    <h2>Nom :</h2>
    <p>{{ user.name }}</p>
    <h2>Email :</h2>
    <p>{{ user.email }}</p>
    <h2>Biographie :</h2>
    <p>{{ user.bio }}</p>
    <br />
    <img :src="user.picture" /><br />
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
    <br />
    <div class="form-row">
      <button @click="logout()" class="button">Modifier mon profil</button>
    </div>
    <br />
    <div class="form-row">
      <button @click="logout()" class="button">Supprimer mon compte</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  name: "Profile",
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
