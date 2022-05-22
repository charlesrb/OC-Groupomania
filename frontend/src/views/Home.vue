<template>
  <div class="homecard">
    <h1 class="card__title">Connexion</h1>
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
  name: "Login",
  mounted: function () {
    this.$store.dispatch("getPosts");
  },
  computed: {
    ...mapState({
      post: "postInfos",
    }),
  },
};
</script>

<style></style>
