<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Voilà qui je suis</p>
    <img :src="user.picture" /><br />
    <h2>Prénom :</h2>
    <p>{{ user.surname }}</p>
    <h2>Nom :</h2>
    <p>{{ user.name }}</p>
    <h2>Email :</h2>
    <p>{{ user.email }}</p>
    <h2>Biographie :</h2>
    <p>{{ user.bio }}</p>
    <br />
    <h2>Mettre à jour ma photo de profil :</h2>
    <div class="form-row">
      <input class="form-row__input" type="file" @change="onFileSelected" />
    </div>
    <div class="form-row">
      <button @click="onUpload()" class="button">Modifier ma photo</button>
    </div>
    <br />

    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
    <br />

    <br />
    <div class="form-row">
      <button @click="logout()" class="button">Supprimer mon compte</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
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
    onFileSelected(event) {
      console.log(event);
      this.picture = event.target.files[0];
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      axios.post;
    },
  },
};
</script>

<style></style>
