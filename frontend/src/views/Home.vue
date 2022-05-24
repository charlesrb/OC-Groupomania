<template>
  <div class="homecard">
    <h1 class="card__title">Fil d'actualités</h1>
    <br />
    <h3>Publier un nouveau post</h3>
    <div class="form-row">
      <input
        v-model="title"
        class="form-row__input"
        type="text"
        placeholder="Titre du post"
      />
    </div>
    <div class="form-row">
      <textarea
        v-model="content"
        class="form-row__input--textarea"
        type="textarea"
        placeholder="Contenu du post"
      ></textarea>
    </div>
    <div class="form-row">
      <button @click="createPost()" class="button">Publier</button>
    </div>

    <div class="card" v-for="item in post" :key="item.id">
      <h2>{{ item.title }}</h2>
      <p>
        {{ item.author.surname }} {{ item.author.name }} le {{ item.createdAt }}
      </p>
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

/* eslint-disable */
export default {
  name: "Home",
  data: function () {
    return {
      title: "",
      content: "",
    };
  },
  mounted: function () {
    this.$store.dispatch("getPosts");
  },
  computed: {
    ...mapState({
      post: "postInfos",
    }),
  },
  methods: {
    createPost: function () {
      const self = this;
      this.$store
        .dispatch("createPost", {
          title: this.title,
          content: this.content,
          authorId: this.$store.state.user.userId,
        })
        .then(
          function () {
            self.$router.push("home");
          },
          function (error) {
            console.log(error);
          }
        );
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
