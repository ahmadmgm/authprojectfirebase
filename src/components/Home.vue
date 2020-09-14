<template>
  <div class="container-fluid no-padding">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Vue Auth Project</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-right float-right" id="navbarNav">
        <ul class="navbar-nav text-right">
          <li class="nav-item">
          <a href="#" @click="logoutUser()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="card mt-5" style="width: 18rem;">
        <img src class="card-img-top" alt />
        <div class="card-body" v-if="user">
          <h5 class="card-title">{{user.displayName}}</h5>
          <p class="card-text">{{user.email}}</p>
          <a href="#" class="btn btn-primary" @click="logoutUser()">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      authUser: {
        isLoggedIn: false,
      },
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser.isLoggedIn = true;
        this.user = user;
      } else this.user = null;
    });
  },
  methods: {
    logoutUser() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },
  },
};
</script>