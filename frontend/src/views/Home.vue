<template>
  <div>
    <Nav></Nav>
    <div class="logo">
      <img class="logo__img" src="../assets/logo.svg" />
    </div>
    <div class="homecard">
      <h1 class="card__title">Fil d'actualités</h1>
      <br />
      <h3>Publier un nouveau post</h3>
      <div class="form-row">
        <input
          v-model="post.title"
          class="form-row__input"
          type="text"
          placeholder="Titre du post"
        />
      </div>
      <div class="form-row">
        <textarea
          v-model="post.content"
          class="form-row__input--textarea"
          type="textarea"
          placeholder="Contenu du post"
        ></textarea>
      </div>
      <div class="form-row">
        <button @click="createPost()" class="button">Publier</button>
      </div>

      <div class="card" v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>
          {{ post.author.surname }} {{ post.author.name }} le
          {{ post.createdAt }}
        </p>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import axios from "axios";

/* eslint-disable */

const instancePost = axios.create({
  baseURL: "http://localhost:8000/api/post",
});

export default {
  components: { Nav },
  name: "Home",
  data: function () {
    return {
      posts: {},
      post: {
        title: "",
        content: "",
        authorId: this.$store.state.user.userId,
      },
    };
  },
  beforeCreate() {
    instancePost
      .get("/")
      .then((data) => (this.posts = data.data))
      .catch((error) => {
        error;
      });
  },

  methods: {
    createPost: function () {
      if (this.$store.state.user.userId == -1) {
        alert("Vous devez être connecté pour publier");
      } else {
        instancePost
          .post("/", this.post)
          .then(() => location.reload())
          .catch((error) => error);
      }
    },
  },
};
</script>

<style scoped>
.logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}
.logo__img {
  width: 500px;
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
.form-row__input::placeholder {
  color: #aaaaaa;
}
.form-row__input--textarea::placeholder {
  color: #aaaaaa;
}
</style>
