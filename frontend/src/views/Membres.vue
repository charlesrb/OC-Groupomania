<template>
  <div>
    <h1 class="title-membres">Les membres de Groupomania</h1>
    <Nav></Nav>
    <div class="homecard">
      <div
        class="card__post"
        :class="{ 'card__post--disabled': user.disabled }"
        v-for="user in users"
        :key="user.id"
      >
        <div class="card__post--img">
          <img :src="user.picture" />
          <div class="card__post--title">
            <div>
              <h2>{{ user.surname }} {{ user.name }}</h2>
              <p>
                Créé le
                {{ formatDate(user) }}
              </p>
              <p>{{ user.bio }}</p>
              <p>{{ user.posts.length }} posts</p>
              <p class="disabled-account" v-if="user.disabled">
                Compte désactivé
              </p>
            </div>
            <div v-if="isAdmin == 'true'">
              <button
                class="button"
                @click="disabledUser(user.id)"
                v-if="!user.disabled"
              >
                Désactiver
              </button>
              <button
                class="button"
                @click="enabledUser(user.id)"
                v-else-if="user.disabled"
              >
                Réactiver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import axios from "axios";
const instanceUsers = axios.create({
  baseURL: "http://localhost:8000/api/user",
});
/* eslint-disable */
export default {
  components: { Nav },
  name: "Membres",
  data: function () {
    return {
      users: {},
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  beforeCreate() {
    if (!this.$store.state.isLogged) {
      this.$router.push("/");
      return;
    } else {
      instanceUsers
        .get("/")
        .then((data) => {
          this.users = data.data;
        })
        .catch((error) => {
          error;
        });
    }
  },

  methods: {
    formatDate: function (user) {
      const options = { hour: "numeric", minute: "numeric" };
      const newDateMonth = new Date(user.createdAt).toLocaleDateString();
      const newDateHour = new Date(user.createdAt).toLocaleTimeString(
        "fr-FR",
        options
      );
      return `${newDateMonth} à ${newDateHour}`;
    },

    disabledUser: function (userId) {
      instanceUsers
        .put(`/disable/${userId}`, { disabled: true })
        .then(() => location.reload())

        .catch((error) => {
          error;
        });
    },

    enabledUser: function (userId) {
      instanceUsers
        .put(`/disable/${userId}`, { disabled: false })
        .then(() => location.reload())

        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style scoped>
.card__post {
  max-width: 100%;

  background: white;
  border-radius: 16px;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 32px;
}

.disabled-account {
  color: #fd2d01;
  font-weight: 800;
}

.card__post--img {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
}
.card__post--img img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 30px;
  margin-right: 10px;
}

.card__post--disabled {
  background-color: #ffd7d7;
}

.card__post--title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.card__post--title div {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}

.title-membres {
  font-size: 48px;
  margin-bottom: 10px;
  color: white;
  text-align: center;
}
</style>