<template>
  <div class="card">
    <div class="card__img"><img :src="user.picture" /><br /></div>
    <h1 v-if="mode == 'display'" class="card__title">Profil</h1>
    <h1 v-if="mode == 'editing'" class="card__title">Modifier mon profil</h1>

    <p class="card__subtitle">Voilà qui je suis</p>
    <br />
    <h2 v-if="mode == 'display'">Prénom : {{ user.surname }}</h2>
    <div class="form-row" v-if="mode == 'editing'">
      <input
        v-model="prenom"
        class="form-row__input"
        type="text"
        :placeholder="user.surname"
      />
      <input
        v-model="nom"
        class="form-row__input"
        type="text"
        :placeholder="user.name"
      />
    </div>
    <div v-if="mode == 'editing'" class="form-row">
      <input
        v-model="email"
        class="form-row__input"
        type="text"
        :placeholder="user.email"
      />
    </div>
    <div v-if="mode == 'editing'" class="form-row">
      <input
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <h2 v-if="mode == 'editing'">Biographie :</h2>
    <div v-if="mode == 'editing'" class="form-row">
      <textarea
        v-model="bio"
        class="form-row__input--textarea"
        type="textarea"
        :placeholder="user.bio"
      ></textarea>
    </div>
    <h2 v-if="mode == 'display'">Nom : {{ user.name }}</h2>
    <h2 v-if="mode == 'display'">Email : {{ user.email }}</h2>

    <h2 v-if="mode == 'display'">Biographie :</h2>
    <p v-if="mode == 'display'">{{ user.bio }}</p>
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
      <button
        v-if="mode == 'display'"
        @click="SwitchToEditingProfile()"
        class="button"
      >
        Modifier mon profil
      </button>
    </div>
    <div class="form-row">
      <button v-if="mode == 'editing'" @click="modifyAccount()" class="button">
        Modifier mon profil
      </button>
    </div>
    <br />
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
    <br />
    <div class="form-row">
      <button @click="deleteUser()" class="button">Supprimer mon compte</button>
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
      mode: "display",
      email: "",
      prenom: "",
      nom: "",
      bio: "",
      password: "",
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
    SwitchToEditingProfile: function () {
      this.mode = "editing";
    },
    SwitchToDisplayingProfile: function () {
      this.mode = "display";
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteUser: function () {
      const self = this;
      this.$store.dispatch("deleteUser").then(
        function () {
          self.$store.commit("logout");
          self.$router.push("/");
        },
        function (error) {
          console.log(error);
        }
      );
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
    modifyAccount: function () {
      const self = this;

      this.$store
        .dispatch("modifyAccount", {
          email: this.email,
          name: this.nom,
          surname: this.prenom,
          password: this.password,
          picture: "",
          bio: this.bio,
        })
        .then(
          function () {
            self.mode = "display";
            self.$router.push("profile");
          },
          function (error) {
            console.log(error);
          }
        );
    },

    // deleteAccount() {
    //   this.$store.dispatch('deleteAccount')
    // }
  },
};
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}

.form-row__input--textarea {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  color: black;
  height: 100px;
  overflow: auto;
  word-wrap: break-word;
}
</style>
