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
      <!-- Formulaires de connexion et d'inscription-->
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
      <!-- Div d'affichage du message d'erreur -->
      <div id="alert__message">{{ errMessage }}</div>
      <div class="form-row">
        <button
          @click="login()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          v-if="mode == 'login'"
        >
          <span>Connexion</span>
        </button>
        <!-- Bouton activé uniquement si les champs sont remplis -->
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
      errMessage: "",
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/profile");
      return;
    }
  },
  computed: {
    // Vérification que les champs du formulaire ne sont pas vides
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
      this.errMessage = "";
    },
    SwitchToLogin: function () {
      this.mode = "login";
      this.errMessage = "";
    },

    login: function () {
      const user = { ...this.user };
      document.getElementById("alert__message").innerHTML = "";
      // Connexion à l'API pour login
      instanceUser
        .post("/login", user)
        .then((data) => {
          if (data.data.disabled) {
            this.errMessage =
              "Votre compte est désactivé, veuillez contacter l'administrateur";
          } else {
            store.state.isLogged = true;
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userId", data.data.userId);
            localStorage.setItem("isAdmin", data.data.isAdmin);

            if (data.status === 200) {
              this.$router.push("home");
            }
          }
        })
        .catch((error) => {
          error;
          if (error.response.status) {
            this.errMessage = "Email ou mot de passe incorrect";
          }
        });
    },
    createAccount: function () {
      const user = { ...this.user };
      // Regex pour vérification des champs du formulaire
      const regexName = /^[a-zéèçàêïü]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim;
      const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
      // Test des Regex
      if (!regexName.test(user.surname && user.name)) {
        this.errMessage = "Name Err! => format nom et/ou prénom incorrect";
        return;
      }
      if (!regexEmail.test(user.email)) {
        this.errMessage =
          "Email Err! => l'email inscrit n'a pas le bon format (exemple@mail.com)";
        return;
      }
      if (!regexPassword.test(user.password)) {
        this.errMessage =
          "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial";
        return;
      }
      // Connexion à l'API pour signup
      instanceUser
        .post("/signup", user)
        .then((data) => {
          if (data.status === 200) {
            instanceUser
              .post("/login", user)
              .then((data) => {
                store.state.isLogged = true;
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("userId", data.data.userId);
                localStorage.setItem("isAdmin", data.data.isAdmin);

                if (data.status === 200) {
                  this.$router.push("home");
                } else {
                  this.errMessage = "Email ou mot de passe incorrect";
                  return;
                }
              })
              .catch((error) => {
                console.error(error);
                this.errMessage = "Email déjà existant";
              });
          } else {
            this.errMessage = "Email déjà existant";
            return;
          }
        })
        .catch((error) => {
          error;
          if (error.response.status) {
            this.errMessage =
              "Il existe déjà un compte avec cette adresse email";
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
#alert__message {
  font-weight: 700;
  color: red;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
</style>