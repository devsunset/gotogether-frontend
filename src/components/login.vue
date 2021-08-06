<template>
    <div class="login-box">
        <!-- /.login-logo -->
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                 <router-link to="/"><b>Go</b>Together</router-link>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <Form @submit="handleLogin" :validation-schema="schema">
                    <div class="input-group mb-1">
                        <Field name="username" type="text" class="form-control"  placeholder="Username"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div><ErrorMessage name="username" class="error-feedback" /></div>
                    <div class="input-group mb-1">
                        <Field name="password" type="password" class="form-control" placeholder="Password"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div><ErrorMessage name="password" class="error-feedback" /></div>
                    <div class="row">
                        <!--
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label for="remember"> Remember Me </label>
                            </div>
                        </div> 
                        -->
                        <!-- /.col -->
                        <div class="col-12 mb-3">
                            <button
                                type="submit"
                                class="btn btn-primary btn-block" 
                                :disabled="loading">
                              <span
                                  v-show="loading"
                                  class="spinner-border spinner-border-sm"
                                ></span>
                                <span>Login</span>
                            </button>
                        </div>
                        <!-- /.col -->
                    </div>
                    <div v-if="message" class="alert alert-danger" role="alert">
                      {{ message }}
                    </div>
                 </Form>

                <!-- 
                    <div class="social-auth-links text-center mt-2 mb-3">
                    <button @click="loginByGoogle" class="btn btn-block btn-danger">
                        <i class="fab fa-google-plus mr-2"></i> Sign in using
                        Google+
                    </button>
                    </div> 
                -->
                <!-- /.social-auth-links -->

                <p class="mb-1">
                    <router-link to="/forgot-password">
                      <!--  I forgot my password -->
                    </router-link>
                </p>
                <p class="mb-0">
                    <router-link to="/register" class="text-center">
                        Register a new membership
                    </router-link>
                </p>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

var appElement = document.getElementById('app');

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },mounted() {
            appElement.classList.add('login-page');
 },unmounted(){
        appElement.classList.remove('login-page');
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>