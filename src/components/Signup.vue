<template>
  <div class="container">
    <form
      @submit.prevent="userRegisterationForm"
      class="signup-form p-3 mt-5 col-md-6 pt-4 text-left mb-5"
    >
      <div class="form-group">
        <label for="formGroupExampleInput">Your Name</label>
        <input type="text" class="form-control" v-model.trim="$v.user.name.$model" placeholder />
        <div class="error" v-if="check.submitStatusError && !$v.user.name.required">Name is required</div>
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.name.minLength"
        >Name must have at least {{$v.user.name.$params.minLength.min}} letters.</div>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput">Email</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="$v.user.mail.$model"
          placeholder="Your email here.."
        />
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.mail.required"
        >Email is required</div>
        <div class="error" v-if="check.submitStatusError && !$v.user.mail.email">Email not valid</div>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Age</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.user.age.$model"
          placeholder="Your age here.."
        />
        <div class="error" v-if="check.submitStatusError && !$v.user.age.required">Age is required</div>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Password</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput2"
          v-model="$v.user.password.$model"
        />
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.password.required"
        >Password is required</div>
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.password.minLength"
        >Password must be at least {{$v.user.password.$params.minLength.min}} letters.</div>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput2"
          v-model="$v.user.cPassword.$model"
        />
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.cPassword.required"
        >Confirm password is required</div>
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.cPassword.minLength"
        >Confirm password must be at least {{$v.user.cPassword.$params.minLength.min}} letters.</div>
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.cPassword.sameAsPassword"
        >passwords does not match.</div>
      </div>
      <div class="form-group">
        <label>Country</label>
        <select v-model="user.country" class="form-control">
          <option selected>Choose...</option>
          <option>USA</option>
          <option>JORDAN</option>
        </select>
        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.country.required"
        >country is required</div>
      </div>
      <div class="form-group">
        <div
          class="float-left mr-2 mb-2 d-block"
          v-for="(hob , index) in user.hobbies"
          v-bind:key="index"
        >
          <input type="text" v-model="hob.hobbyName" />
        </div>
        <div class="clearfix"></div>
        <label for="formGroupExampleInput2" class="font-weight-bold mt-3">Add some hobbies</label>
        <button
          type="button"
          class="btn btn-hobby d-block mt-2 mb-2"
          @click="addHobbies()"
        >Add Hobby</button>
        <p>Please add hobbies</p>

        <div
          class="error"
          v-if="check.submitStatusError && !$v.user.hobbies.minLength"
        >Hobbies must have at least {{ $v.user.hobbies.$params.minLength.min }} elements.</div>
        <div
          class="error"
          v-else-if="check.submitStatusError && !$v.user.hobbies.required"
        >Hobbies must not be empty.</div>
        <div
          class="error"
          v-else-if="check.submitStatusError &&$v.user.hobbies.$error"
        >Hobbies must not be empty.</div>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="check.acceptTerm" />
            <label class="form-check-label text-danger" for="gridCheck1">Accept Terms Of Use</label>
          </div>
        </div>
      </div>
      <button type="submit" :disabled="!check.acceptTerm || check.loading" class="btn btn-primary">
        Register
        <div v-if="check.loading" class="spinner-border spinner-border-sm text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </button>
      <!-- <button type="button" @click="doCheck()">click me</button> -->
      <div class="form-group">
        <small>
          if you have already account please
          <router-link to="/login">SignIn</router-link>
        </small>
      </div>
    </form>
  </div>
</template>

<script>
import firbase from "firebase";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      check: {
        cPassword: "",
        acceptTerm: "",
        loading: false,
        submitStatusError: false,
      },
      user: {
        name: "",
        mail: "",
        age: "",
        password: "",
        cPassword: "",
        country: "",
        hobbies: [],
      },
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4),
      },
      mail: {
        required,
        email,
      },
      age: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      cPassword: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs("password"),
      },
      country: {
        required,
      },
      hobbies: {
        required,
        minLength: minLength(1),
        $each: {
          hobbyName: {
            required,
            minLength: minLength(2),
          },
        },
      },
    },
    check: {},
  },
  methods: {
    addHobbies() {
      this.user.hobbies.push({
        hobbyName: "",
      });
    },
    userRegisterationForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.check.submitStatusError = true;
      } else {
        this.check.loading = true;
        firbase
          .auth()
          .createUserWithEmailAndPassword(this.user.mail, this.user.password)
          .then((res) => {
            this.check.submitStatusError = false;
            res.user
              .updateProfile({
                displayName: this.user.name,
                age: this.user.age,
                country: this.user.country,
                hobbies: this.user.hobbies,
              })
              .then(() => {
                this.check.loading = false;
                this.$router.push("/login");
              });
          })
          .catch((err) => {
            this.check.loading = false;
            alert(err.message);
          });
      }
    },
  },
};
</script>
