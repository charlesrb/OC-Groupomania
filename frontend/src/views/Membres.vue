<template>
  <div>
    <h1 class="title-membres">Les membres de Groupomania</h1>
    <Nav></Nav>
    <div class="homecard">
      <div class="card__post" v-for="user in users" :key="user.id">
        <div class="card__post--img">
          <img :src="user.picture" />
          <div class="card__post--title">
            <h2>{{ user.surname }} {{ user.name }}</h2>
            <p>
              Créé le
              {{ formatDate(user) }}
            </p>
            <p>{{ user.bio }}</p>
            <p>{{ user.posts.length }} posts</p>
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
    };
  },
  beforeCreate() {
    instanceUsers
      .get("/")
      .then((data) => {
        this.users = data.data;
      })
      .catch((error) => {
        error;
      });
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

.card__post--img {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.card__post--img img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
}

.card__post--title {
  display: flex;
  flex-direction: column;
}

.title-membres {
  font-size: 48px;
  margin-bottom: 10px;
  color: white;
  text-align: center;
}
</style>