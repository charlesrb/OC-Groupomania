<template>
  <div>
    <div class="logo">
      <img class="logo__img" src="../assets/logo.svg" />
    </div>
    <div class="card">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>

      <p class="card__subtitle" v-if="mode == 'login'">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="SwitchToCreateAccount()"
          >Créer un compte</span
        >
      </p>
      <p class="card__subtitle" v-else>
        Tu as déjà un compte ?
        <span class="card__action" @click="SwitchToLogin()">Se connecter</span>
      </p>
      <div class="form-row">
        <input
          v-model="user.email"
          class="form-row__input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input
          v-model="user.surname"
          class="form-row__input"
          type="text"
          placeholder="Prénom"
        />
        <input
          v-model="user.name"
          class="form-row__input"
          type="text"
          placeholder="Nom"
        />
      </div>
      <div class="form-row">
        <input
          v-model="user.password"
          class="form-row__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>

      <!-- <div class="form-row" v-if="mode == 'login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create'">
      Adresse mail déjà utilisée
    </div> -->
      <div class="form-row">
        <button
          @click="login()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          v-if="mode == 'login'"
        >
          <span>Connexion</span>
        </button>
        <button
          @click="createAccount()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          v-else
        >
          <span>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import axios from "axios";
import store from "@/store";

const instanceUser = axios.create({
  baseURL: "http://localhost:8000/api/user",
});

export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      user: {
        email: "",
        surname: "",
        name: "",
        password: "",
        picture: "",
        bio: "",
      },
      errorMessage: "",
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/profile");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.user.email != "" &&
          this.user.surname != "" &&
          this.user.name != "" &&
          this.user.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.user.email != "" && this.user.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    SwitchToCreateAccount: function () {
      this.mode = "create";
    },
    SwitchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const user = { ...this.user };
      instanceUser
        .post("/login", user)
        .then((data) => {
          if (data.data.disabled) {
            alert(
              "Votre compte est désactivé, veuillez contacter l'administrateur"
            );
          } else {
            store.state.isLogged = true;
            console.log(data);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userId", data.data.userId);
            localStorage.setItem("isAdmin", data.data.isAdmin);

            if (data.status === 200) {
              this.$router.push("home");
            } else {
              this.errorMessage = "Email ou mot de passe incorrect";
              return;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createAccount: function () {
      const user = { ...this.user };
      instanceUser.post("/signup", user).then((data) => {
        if (data.status === 200) {
          instanceUser
            .post("/login", user)
            .then((data) => {
              store.state.isLogged = true;
              console.log(data);
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("userId", data.data.userId);
              localStorage.setItem("isAdmin", data.data.isAdmin);

              if (data.status === 200) {
                this.$router.push("home");
              } else {
                this.errorMessage = "Email ou mot de passe incorrect";
                return;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          this.errorMessage = "Email déjà existant";
          return;
        }
      });
    },
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
</style>