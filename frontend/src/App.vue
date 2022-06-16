<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient(120deg, #fd2d01 20%, #ffd7d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

@media screen and (max-width: 768px) {
  body {
    padding-left: 0;
    padding-right: 0;
  }
  .homecard {
    border-radius: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.homecard {
  max-width: 100%;
  width: 800px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
@media screen and (max-width: 768px) {
  .homecard {
    padding-left: 10px;
    padding-right: 10px;
  }
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.card__img {
  width: 20%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
}

.card__detail {
  display: flex;
  justify-content: left;
  align-content: center;
}
.button {
  background: #fd2d01;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #fd2d01;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #fd2d01;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>
