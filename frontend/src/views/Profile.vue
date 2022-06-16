<template>
  <div>
    <Nav></Nav>
    <div class="card">
      <div class="card__img"><img :src="user.picture" /><br /></div>
      <h1 v-if="mode == 'display'" class="card__title">Profil</h1>
      <h1 v-if="mode == 'editing'" class="card__title">Modifier mon profil</h1>
      <h1 v-if="mode == 'modify_password'" class="card__title">
        Modifier mon mot de passe
      </h1>

      <p class="card__subtitle" v-if="mode != 'modify_password'">
        Voilà qui je suis
      </p>
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
      <div id="oldPassword" class="form-row" v-if="mode == 'modify_password'">
        <input
          v-model="user.password"
          class="form-row__input"
          type="password"
          placeholder="Veuillez saisir votre ancien mot de passe"
        />
      </div>
      <div class="form-row" v-if="mode == 'modify_password'">
        <input
          v-model="user.newPasswordConfirm"
          class="form-row__input"
          type="password"
          placeholder="Veuillez saisir votre nouveau mot de passe"
        />
      </div>
      <div
        id="passwordConfirm"
        class="form-row"
        v-if="mode == 'modify_password'"
      >
        <input
          v-model="user.newPassword"
          class="form-row__input"
          type="password"
          placeholder="Confirmez votre nouveau mot de passe"
        />
      </div>
      <div id="alert__message">{{ errMessage }}</div>
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
        <label for="picture" class="uploadPicture"
          ><i class="fa-solid fa-image uploadPicture__icon"></i>Choisissez une
          image</label
        >
        <input
          class="form-row__input"
          type="file"
          ref="picture"
          name="picture"
          id="picture"
          hidden
          @change="onFileSelected"
        />
      </div>
      <div class="form-row" v-if="mode == 'editing'"></div>
      <br />

      <div class="form-row" v-if="mode == 'display'">
        <button @click="SwitchToEditingProfile()" class="button">
          Modifier mon profil
        </button>
        <button @click="SwitchToModifyPassword()" class="button">
          Modifier mon mot de passe
        </button>
      </div>

      <div class="form-row" v-if="mode == 'editing'">
        <button @click="modifyAccount()" class="button">
          Modifier mon profil
        </button>
      </div>
      <div class="form-row" v-if="mode == 'modify_password'">
        <button @click="modifyPassword()" class="button">
          Modifier mon mot de passe
        </button>
      </div>
      <div
        class="form-row"
        v-if="mode == 'editing' || mode == 'modify_password'"
      >
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
import Nav from "../components/nav.vue";
import store from "@/store";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/user",
});

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export default {
  name: "Profile",
  components: { Nav },

  beforeCreate() {
    // Si l'état "isLogged" est false dans le store, on renvoie vers la page d'inscription / login
    if (!this.$store.state.isLogged) {
      this.$router.push("/");
      return;
    } else {
      // Sinon, on récupère l'id de l'utilisateur dans le local storage puis on récupère les informations dans la base
      const userId = localStorage.getItem("userId");
      instance
        .get(`/${userId}`)
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
      newPicture: "",
      errMessage: "",
    };
  },

  methods: {
    SwitchToEditingProfile: function () {
      this.mode = "editing";
      this.errMessage = "";
    },
    SwitchToDisplayingProfile: function () {
      this.mode = "display";
      this.errMessage = "";
    },
    SwitchToModifyPassword: function () {
      this.mode = "modify_password";
      this.errMessage = "";
    },

    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    modifyAccount: function () {
      let formData = new FormData();
      formData.append("surname", this.user.surname);
      formData.append("name", this.user.name);
      formData.append("bio", this.user.bio);
      formData.append("password", this.user.password);
      formData.append("picture", this.newPicture);
      const userId = localStorage.getItem("userId");
      instance
        .put(`/${userId}`, formData)
        .then((res) => location.reload())
        .catch((error) => {
          error;
        });
    },
    modifyPassword: function () {
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
      if (
        this.user.newPassword == this.user.newPasswordConfirm &&
        regexPassword.test(this.user.newPassword)
      ) {
        const userId = localStorage.getItem("userId");
        let data = {
          password: this.user.password,
          newPassword: this.user.newPassword,
        };
        try {
          instance
            .put(`/modifypassword/${userId}`, data, config)
            .then(() => {
              location.reload();
            })
            .catch((error) => {
              error;

              if (error.response.status) {
                this.errMessage = "Votre mot de passe n'est pas correct";
              }
            });
        } catch {
          this.errMessage = "Erreur de connexion avec l'API";
        }
      } else {
        this.errMessage =
          "Vos deux mots de passe doivent être identiques et doivent être composé entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial";
      }
    },

    disabledUser: function () {
      const userId = localStorage.getItem("userId");
      instance
        .put(`/disable/${userId}`, { disabled: true })
        .then(() => {
          store.state.isLogged = false;
          this.$router.push("/");
          localStorage.clear();
        })
        .catch((error) => {
          error;
        });
    },

    onFileSelected(event) {
      this.newPicture = this.$refs.picture.files[0];
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

.uploadPicture {
  background-color: #ffd7d7;
  color: #fd2d01;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
#alert__message {
  font-weight: 700;
  color: red;
}
.uploadPicture__icon {
  margin-right: 10px;
}

.passwordError {
  color: red;
  font-weight: 700;
}

.card__img img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50px;
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
