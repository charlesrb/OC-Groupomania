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
        <input
          class="form-row__input"
          type="file"
          ref="picture"
          name="picture"
          id="picture"
          @change="onFileSelected"
        />
      </div>
      <div class="form-row">
        <img
          id="preview"
          :src="post.picture"
          :alt="post.picture"
          class="profile"
        />
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
              {{ formatDate(post) }}
            </p>
          </div>
        </div>

        <p>{{ post.content }}</p>
        <img class="post__img" :src="post.picture" v-if="post.picture" />
        <div class="card__post--like">
          <span
            @click="
              createLike(post)
              // getLike(post);
            "
            ><i class="fa-solid fa-thumbs-up emoji"></i
            >{{ post.likes.length }}</span
          >
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
                <p>Le {{ formatDate(comment) }}</p>
                <p>{{ comment.content }}</p>
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

const instanceLike = axios.create({
  baseURL: "http://localhost:8000/api/like",
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
        authorId: parseInt(localStorage.getItem("userId")),
        picture: "",
      },
      file: "",
      comment: {
        content: "",
        authorId: parseInt(localStorage.getItem("userId")),
        postId: "",
      },
      like: {
        postId: "",
        authorId: parseInt(localStorage.getItem("userId")),
      },
      // totalLike: "",
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
      if (this.$store.state.isLogged == false) {
        alert("Vous devez être connecté pour publier");
      } else {
        let formData = new FormData();
        formData.append("title", this.post.title);
        formData.append("content", this.post.content);
        formData.append("picture", this.post.picture);
        formData.append("authorId", this.post.authorId);

        instancePost
          .post("/", formData)
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

    createLike: function (post) {
      this.like.postId = post.id;
      instanceLike
        .post("/", this.like)
        .then((res) => location.reload())
        .catch((error) => error);
    },

    // getLike: function (post) {
    //   this.like.postId = post.id;
    //   instanceLike
    //     .get("/", this.like)
    //     .then((res) => (this.totalLike = res.data.length))
    //     .catch((error) => error);
    // },

    onFileSelected(event) {
      this.post.picture = this.$refs.picture.files[0];
      let input = event.target;

      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    formatDate: function (date) {
      const options = { hour: "numeric", minute: "numeric" };
      const newDateMonth = new Date(date.createdAt).toLocaleDateString();
      const newDateHour = new Date(date.createdAt).toLocaleTimeString(
        "fr-FR",
        options
      );

      return `${newDateMonth} à ${newDateHour}`;
    },
  },
  computed: {},
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
  object-fit: cover;
}
.post__img {
  margin-top: 20px;
  height: 300px;
  width: 100%;
  object-fit: cover;
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
.emoji {
  margin-right: 5px;
  color: #fd2d01;
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

.card__post--like span:hover {
  cursor: pointer;
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
