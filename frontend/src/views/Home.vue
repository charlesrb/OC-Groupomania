<template>
  <div>
    <Nav></Nav>
    <div class="logo">
      <img class="logo__img" src="../assets/logo.svg" />
    </div>
    <div class="homecard">
      <h1 class="card__title">Fil d'actualités</h1>
      <br />
      <!-- *** -->
      <!-- Formulaire de publication d'un nouveau post -->
      <!-- *** -->
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
      <!-- *** -->
      <!-- Div de preview de l'image uploadée -->
      <!-- *** -->
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
      <!-- *** -->
      <!-- Boucle for pour afficher les posts par ordre antéchronologique -->
      <!-- *** -->
      <div class="card__post" v-for="post in posts" :key="post.id">
        <div class="card__post--img">
          <div class="card__post--detail">
            <img :src="post.author.picture" />
            <div class="card__post--title">
              <h2 v-if="mode == 'display' || post_modify != post.id">
                {{ post.title }}
              </h2>
              <div
                class="form-row"
                v-if="mode == 'modify' && post_modify == post.id"
              >
                <input
                  v-model="post.title"
                  class="form-row__input"
                  type="text"
                  placeholder="Titre du post"
                />
              </div>

              <p>
                {{ post.author.surname }} {{ post.author.name }} le
                {{ formatDate(post) }}
              </p>
            </div>
          </div>
          <!-- *** -->
          <!-- Edition / Suppression des posts -->
          <!-- *** -->
          <div class="admin__button">
            <div class="card__post--delete" v-if="post.author.id == userId">
              <span @click="SwitchToModifyPost(post)" v-if="mode == 'display'">
                <i class="fa-solid fa-pen"></i>
              </span>
              <span
                @click="SwitchToDisplayPost(post)"
                v-if="mode == 'modify' && post_modify == post.id"
              >
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </div>
            <div
              class="card__post--delete"
              v-if="isAdmin == 'true' || post.author.id == userId"
            >
              <span @click="deletePost(post.id)"
                ><i class="fa-solid fa-circle-xmark"></i
              ></span>
            </div>
          </div>
        </div>
        <p v-if="mode == 'display' || post_modify != post.id">
          {{ post.content }}
        </p>
        <!-- *** -->
        <!-- Modification d'un post -->
        <!-- *** -->
        <div class="form-row" v-if="mode == 'modify' && post_modify == post.id">
          <textarea
            v-model="post.content"
            class="form-row__input--textarea"
            type="textarea"
            placeholder="Contenu du post"
          ></textarea>
        </div>
        <!-- *** -->
        <!-- Lightbox pour afficher image entièrement -->
        <!-- *** -->
        <img
          class="post__img"
          :src="post.picture"
          v-if="post.picture && showImage"
          @click="toggleImage(post)"
        />

        <div
          class="lightbox"
          v-if="post.picture && !showImage && postBigImage == post.id"
        >
          <span
            :style="{ backgroundImage: 'url(' + post.picture + ')' }"
            @click="toggleImage(post)"
            ><i class="fa-solid fa-circle-xmark close-lightbox"></i>fermer</span
          >
        </div>

        <div class="form-row" v-if="mode == 'modify' && post_modify == post.id">
          <label for="newPicture" class="uploadPicture"
            ><i class="fa-solid fa-image uploadPicture__icon"></i>Choisissez une
            image</label
          >
          <input
            class="form-row__input"
            type="file"
            ref="newPicture"
            name="newPicture"
            id="newPicture"
            hidden
            @change="onFileSelectedModify"
          />
        </div>
        <div class="form-row" v-if="mode == 'modify' && post_modify == post.id">
          <img
            id="previewModify"
            :src="post.picture"
            :alt="post.picture"
            class="profile"
          />
        </div>
        <div class="sent" v-if="mode == 'modify' && post_modify == post.id">
          <button @click="modifyPost(post)" class="button__comment">
            Modifier
          </button>
        </div>
        <!-- *** -->
        <!-- Like / Dislike -->
        <!-- *** -->
        <div class="card__post--like">
          <span @click="createLike(post)"
            ><i
              class="fa-solid fa-thumbs-up emoji"
              :class="{ 'emoji--disabled': !isLiked(post) }"
            ></i
            >{{ post.likes.length }}</span
          >
        </div>
        <br />
        <!-- *** -->
        <!-- Boucle for pour afficher les commentaires par post -->
        <!-- *** -->
        <div class="comments">
          <h4>Commentaires</h4>
          <div v-for="comment in comments" :key="comment.id">
            <div class="card__post--comments" v-if="post.id == comment.postId">
              <div class="comment--img">
                <img :src="comment.author.picture" />
              </div>
              <div class="comment--content">
                <div class="comment--content-meta">
                  <div>
                    <h5>
                      {{ comment.author.surname }} {{ comment.author.name }}
                    </h5>
                    <p>Le {{ formatDate(comment) }}</p>
                  </div>
                  <div class="admin__button">
                    <div
                      class="card__comment--delete"
                      v-if="comment.author.id == userId"
                    >
                      <span
                        @click="SwitchToModifyComment(comment)"
                        v-if="mode == 'display'"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </span>
                      <span
                        @click="SwitchToDisplayComment(comment)"
                        v-if="mode == 'modify'"
                      >
                        <i class="fa-solid fa-arrow-left"></i>
                      </span>
                    </div>
                    <div
                      class="card__comment--delete"
                      v-if="isAdmin == 'true' || comment.author.id == userId"
                    >
                      <span @click="deleteComment(comment.id)"
                        ><i class="fa-solid fa-circle-xmark"></i
                      ></span>
                    </div>
                  </div>
                </div>
                <p v-if="mode == 'display' || comment_modify != comment.id">
                  {{ comment.content }}
                </p>

                <div
                  class="form-row"
                  v-if="mode == 'modify' && comment_modify == comment.id"
                >
                  <textarea
                    v-model="comment.content"
                    class="form-row__input--textarea--comment"
                    type="textarea"
                    placeholder="Contenu du post"
                  ></textarea>
                </div>
                <div
                  class="form-row"
                  v-if="mode == 'modify' && comment_modify == comment.id"
                >
                  <button
                    @click="modifyComment(comment)"
                    class="button__comment"
                  >
                    Modifier
                  </button>
                </div>
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

// Création des variables pour la connexion à l'API

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

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
      isAdmin: localStorage.getItem("isAdmin"),
      userId: parseInt(localStorage.getItem("userId")),
      mode: "display",
      post_modify: "",
      comment_modify: "",
      newPicture: "",
      showImage: true,
      postBigImage: "",
    };
  },
  beforeCreate() {
    if (!this.$store.state.isLogged) {
      this.$router.push("/");
      return;
    } else {
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
    }
  },
  computed: {},
  methods: {
    SwitchToModifyPost: function (post) {
      this.mode = "modify";
      this.post_modify = post.id;
    },
    SwitchToDisplayPost: function (post) {
      this.mode = "display";
    },

    SwitchToModifyComment: function (comment) {
      this.mode = "modify";
      this.comment_modify = comment.id;
    },
    SwitchToDisplayComment: function (comment) {
      this.mode = "display";
    },
    toggleImage: function (post) {
      this.showImage = !this.showImage;
      this.postBigImage = post.id;
    },
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
          .post("/", formData, config)
          .then(() => location.reload())
          .catch((error) => error);
      }
    },
    modifyPost: function (post) {
      let formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("picture", this.newPicture);

      instancePost
        .put(`/${post.id}`, formData, config)
        .then(() => location.reload())
        .catch((error) => error);
    },
    deletePost: function (postId) {
      instancePost
        .delete(`/${postId}`, config)
        .then(() => location.reload())
        .catch((error) => error);
    },
    createComment: function (post) {
      this.comment.postId = post.id;
      instanceComment
        .post("/", this.comment, config)
        .then((res) => location.reload())
        .catch((error) => error);
    },
    modifyComment: function (comment) {
      instanceComment
        .put(`/${comment.id}`, { content: comment.content }, config)
        .then(() => location.reload())
        .catch((error) => error);
    },
    deleteComment: function (commentId) {
      instanceComment
        .delete(`/${commentId}`, config)
        .then(() => location.reload())
        .catch((error) => error);
    },
    createLike: function (post) {
      this.like.postId = post.id;
      instanceLike
        .post("/", this.like, config)
        .then((res) => location.reload())
        .catch((error) => error);
    },
    isLiked: function (post) {
      const postLikedAuthor = post.likes.filter(
        (like) => like.authorId == localStorage.getItem("userId")
      );
      if (postLikedAuthor.length == 0) {
        return false;
      } else {
        return true;
      }
    },
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
    onFileSelectedModify(event) {
      this.newPicture = event.target.files[0];

      let input = event.target;

      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("previewModify").src = e.target.result;
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
.uploadPicture {
  background-color: #ffd7d7;
  color: #fd2d01;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.uploadPicture__icon {
  margin-right: 10px;
}
.card__post--img {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
  justify-content: space-between;
}
.admin__button {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.card__post--detail {
  display: flex;
  flex-direction: row;
}

.card__post--delete {
  color: #fd2d01;
  cursor: pointer;
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
  cursor: pointer;
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
.emoji--disabled {
  color: gray;
}
.comment--content {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
}

.comment--content-meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.comment--content-meta span {
  color: #fd2d01;
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
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .button__comment {
    width: 30%;
  }
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

.form-row__input--textarea--comment {
  padding: 8px;
  border-radius: 8px;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
  border: none;
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

@media screen and (max-width: 768px) {
  .card__post {
    padding-left: 16px;
    padding-right: 16px;
  }
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
.card__comment--delete span:hover {
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
.lightbox {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background: rgba(0, 0, 0, 0.8);
}
.lightbox span {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  cursor: pointer;
  width: 75%;
  height: 75%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  color: white;
}
.close-lightbox {
  color: white;
  cursor: pointer;
  margin-right: 10px;
}
</style>
