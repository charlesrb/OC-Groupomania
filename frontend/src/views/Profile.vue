<template>
  <div>
    <Nav></Nav>
    <div class="card">
      <div class="card__img"><img :src="user.picture" /><br /></div>
      <h1 v-if="mode == 'display'" class="card__title">Profil</h1>
      <h1 v-if="mode == 'editing'" class="card__title">Modifier mon profil</h1>

      <p class="card__subtitle">Voilà qui je suis</p>
      <br />
      <h2 v-if="mode == 'display'">
        Prénom : <span class="card__detail">{{ user.surname }}</span>
      </h2>
      <div class="form-row" v-if="mode == 'editing'">
        <input
          v-model="user.surname"
          class="form-row__input"
          type="text"
          :placeholder="user.surname"
        />
        <input
          v-model="user.name"
          class="form-row__input"
          type="text"
          :placeholder="user.name"
        />
      </div>

      <div v-if="mode == 'editing'" class="form-row">
        <input
          v-model="user.password"
          class="form-row__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>

      <h2 v-if="mode == 'editing'">Biographie :</h2>
      <div v-if="mode == 'editing'" class="form-row">
        <textarea
          v-model="user.bio"
          class="form-row__input--textarea"
          type="textarea"
          :placeholder="user.bio"
        ></textarea>
      </div>
      <h2 v-if="mode == 'display'">
        Nom :<span class="card__detail">{{ user.name }}</span>
      </h2>
      <h2 v-if="mode == 'display'">
        Email :<span class="card__detail"> {{ user.email }}</span>
      </h2>

      <h2 v-if="mode == 'display'">Biographie :</h2>
      <p v-if="mode == 'display'">{{ user.bio }}</p>
      <br />
      <h2 v-if="mode == 'editing'">Mettre à jour ma photo de profil :</h2>
      <div class="profileContainer" v-if="mode == 'editing'">
        <img
          id="preview"
          :src="user.picture"
          :alt="user.picture"
          class="profile"
        />
      </div>
      <div class="form-row" v-if="mode == 'editing'">
        <input
          class="form-row__input"
          type="file"
          ref="picture"
          name="picture"
          id="picture"
          @change="onFileSelected"
        />
      </div>
      <div class="form-row" v-if="mode == 'editing'"></div>
      <br />

      <div class="form-row" v-if="mode == 'display'">
        <button @click="SwitchToEditingProfile()" class="button">
          Modifier mon profil
        </button>
      </div>

      <div class="form-row" v-if="mode == 'editing'">
        <button @click="modifyAccount()" class="button">
          Modifier mon profil
        </button>
      </div>
      <div class="form-row" v-if="mode == 'editing'">
        <button @click="SwitchToDisplayingProfile()" class="button">
          Retour au profil
        </button>
      </div>
      <div class="form-row" v-if="mode == 'display'">
        <button @click="logout()" class="button">Déconnexion</button>
      </div>
      <div class="form-row" v-if="mode == 'display'">
        <button @click="disabledUser()" class="button">
          Désactiver mon compte
        </button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { mapState } from "vuex";
import Nav from "../components/nav.vue";
const instance = axios.create({
  baseURL: "http://localhost:8000/api/user",
});

export default {
  name: "Profile",
  components: { Nav },

  beforeCreate() {
    /* on récupère le profil de l'user avant la création de la page */
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    } else {
      instance
        .get(`/${this.$store.state.user.userId}`)
        .then((data) => (this.user = data.data))
        .catch((error) => {
          error;
        });
    }
  },
  data() {
    return {
      mode: "display",
      user: {},
      file: "",
    };
  },

  // computed: {
  //   ...mapState({
  //     user: "userInfos",
  //   }),
  // },
  methods: {
    SwitchToEditingProfile: function () {
      this.mode = "editing";
    },
    SwitchToDisplayingProfile: function () {
      this.mode = "display";
      console.log(this.user.picture);
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    modifyAccount: function () {
      let formData = new FormData();
      formData.append("surname", this.user.surname);
      formData.append("name", this.user.name);
      formData.append("password", this.user.password);
      formData.append("bio", this.user.bio);
      formData.append("password", this.user.password);
      formData.append("picture", this.user.picture);

      instance
        .put(`/${this.$store.state.user.userId}`, formData)
        .then((res) => (this.mode = "display"))
        .catch((error) => {
          error;
        });
    },

    disabledUser: function () {
      const self = this;
      instance
        .put(`/disable/${this.$store.state.user.userId}`, { disabled: true })
        .then(() => {
          self.$store.commit("logout");
          self.$router.push("/");
        })
        .catch((error) => {
          error;
        });
    },

    onFileSelected(event) {
      this.user.picture = this.$refs.picture.files[0];
      let input = event.target;

      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>

<style scoped>
.card__detail {
  font-size: 18px;
  font-weight: 400;
}
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
