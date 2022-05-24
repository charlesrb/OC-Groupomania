<template>
  <div class="card">
    <div class="card__img"><img :src="user.picture" /><br /></div>
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Voilà qui je suis</p>
    <br />
    <h2>Prénom : {{ user.surname }}</h2>
    <h2>Nom : {{ user.name }}</h2>
    <h2>Email : {{ user.email }}</h2>

    <h2>Biographie :</h2>
    <p>{{ user.bio }}</p>
    <br />
    <!-- <h2>Mettre à jour ma photo de profil :</h2>
    <div class="form-row">
      <input class="form-row__input" type="file" @change="onFileSelected" />
    </div>
    <div class="form-row">
      <button @click="onUpload()" class="button">Modifier ma photo</button>
    </div> -->
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

const instance = axios.create({
  baseURL: "http://localhost:8000/api/user",
});

export default {
  name: "Profile",
  data() {
    return {
      picture: "",
    };
  },
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
      console.log(event.target.files[0].name);
      this.picture = event.target.files[0];
      console.log(this.picture);
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.picture, this.picture.name);

      instance
        .put(`/${this.$store.state.user.userId}`)
        .then((res) => console.log(res))
        .catch(function () {});
    },
  },
};
</script>

<style></style>
