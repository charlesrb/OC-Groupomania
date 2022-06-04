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

      <div class="card__post" v-for="post in posts" :key="post.id">
        <div class="card__post--img">
          <img :src="post.author.picture" />
          <div class="card__post--title">
            <h2>{{ post.title }}</h2>
            <p>
              {{ post.author.surname }} {{ post.author.name }} le
              {{ post.createdAt }}
            </p>
          </div>
        </div>

        <p>{{ post.content }}</p>
        <div class="card__post--like">
          <i class="fa-solid fa-thumbs-up"></i>
          <i class="fa-solid fa-thumbs-down"></i>
        </div>
        <br />
        <div class="comments">
          <h4>Commentaires</h4>
          <div v-for="comment in comments" :key="comment.id">
            <div class="card__post--comments" v-if="post.id == comment.postId">
              <div class="comment--img">
                <img :src="comment.author.picture" />
              </div>
              <div class="comment--content">
                <h5>{{ comment.author.surname }} {{ comment.author.name }}</h5>
                <p>{{ comment.content }}</p>
                <p>{{ comment.createdAt }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <textarea
            v-model.lazy="comment.content"
            class="form-row__input--textarea"
            type="textarea"
            placeholder="Laisser un commentaire"
          ></textarea>
        </div>
        <div class="sent">
          <button @click="createComment(post)" class="button__comment">
            Publier
          </button>
        </div>
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

const instanceComment = axios.create({
  baseURL: "http://localhost:8000/api/comment",
});

export default {
  components: { Nav },
  name: "Home",
  data: function () {
    return {
      posts: {},
      comments: {},
      post: {
        title: "",
        content: "",
        authorId: this.$store.state.user.userId,
      },
      comment: {
        content: "",
        authorId: this.$store.state.user.userId,
        postId: "",
      },
    };
  },
  beforeCreate() {
    instancePost
      .get("/")
      .then((data) => {
        this.posts = data.data;
      })
      .catch((error) => {
        error;
      });

    instanceComment
      .get("/")
      .then((data) => (this.comments = data.data))
      .catch((error) => error);
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
    createComment: function (post) {
      this.comment.postId = post.id;
      instanceComment
        .post("/", this.comment)
        .then((res) => location.reload())
        .catch((error) => error);
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
.comments {
  border-top: 1px solid gray;
  margin-top: 10px;
  padding-top: 10px;
}

.comment--content {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
}

.comment--img img {
  width: 40px;
  border-radius: 20px;
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

.sent {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.button__comment {
  background: #ffd7d7;
  color: #fd2d01;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 25%;
  padding: 16px;
  transition: 0.4s background-color;
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

.card__post {
  max-width: 100%;

  background: white;
  border-radius: 16px;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 32px;
}

.card__post--like {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-end;
}

.card__post--comments {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
