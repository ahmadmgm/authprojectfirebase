<template>
  <div class="container">
    <form @submit.prevent="userLoginForm" class="login-page p-3 mt-5 col-md-6 pt-4 text-left mb-5">
      <div class="form-group">
        <label for="formGroupExampleInput">Email</label>
        <input type="text" class="form-control" v-model="user.mail" placeholder="Your email here.." />
      </div>

      <div class="form-group">
        <label for="formGroupExampleInput2">Password</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput2"
          v-model="user.password"
        />
      </div>
      <div class="form-group">
        <small>don't have account <router-link to="/signup">SignUp</router-link></small>
      </div>
      <button :disabled="check.loading" type="submit" class="btn btn-primary">
        Login
        <div v-if="check.loading" class="spinner-border spinner-border-sm text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </button>
    </form>
  </div>
</template>

<script>
import firbase from "firebase";
export default {
  data() {
    return {
      check: {
        loading: false,
      },
      user: {
        mail: "",
        password: "",
      },
    };
  },
  methods: {
    userLoginForm() {
      this.check.loading = true;
      firbase
        .auth()
        .signInWithEmailAndPassword(this.user.mail, this.user.password)
        .then(() => {
          this.check.loading = false;
          this.$router.push("/home");
        })
        .catch((err) => {
          this.check.loading = false;
          alert(err.message);
        });
    },
  },
};
</script>