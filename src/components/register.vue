<template>
    <div class="register-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <router-link to="/"><b>Go</b>Together</router-link>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Register a new membership</p>

                <Form @submit="handleRegister" :validation-schema="schema">
                    <div v-if="!successful">
                        <div class="input-group mb-1">
                            <Field name="userid" type="text" class="form-control" placeholder="userid"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div><ErrorMessage name="userid" class="error-feedback" /></div>
                        <div class="input-group mb-1">
                            <Field name="username" type="text" class="form-control" placeholder="username"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div><ErrorMessage name="username" class="error-feedback" /></div>
                        <div class="input-group mb-1">
                            <Field name="email" type="email" class="form-control" placeholder="email" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div><ErrorMessage name="email" class="error-feedback" /></div>
                        <div class="input-group mb-1">
                            <Field name="password" type="password" class="form-control" placeholder="password"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div><ErrorMessage name="password" class="error-feedback" /></div>
                        <div class="input-group mb-1">
                            <Field name="retypepassword" type="password" class="form-control" placeholder="retype password"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div><ErrorMessage name="retypepassword" class="error-feedback" /></div>
                        <div class="row">
                            <!--
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input
                                        type="checkbox"
                                        id="agreeTerms"
                                        name="terms"
                                        value="agree"
                                    />
                                    <label for="agreeTerms">
                                        I agree to the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            -->
                            <!-- /.col -->
                            <div class="col-12 mb-3">
                                <button
                                    type="submit"
                                    @click="login"
                                    class="btn btn-primary btn-block"
                                >
                                    Register
                                </button>
                            </div>
                            <!-- /.col -->
                        </div>
                        <router-link to="/login" class="text-center">
                            I already have a membership
                        </router-link>
                    </div>
                </Form>
                <!--
                <div class="social-auth-links text-center">
                    <button @click="loginByGoogle" class="btn btn-block btn-danger">
                        <i class="fab fa-google-plus mr-2"></i>
                        Sign up using Google+
                    </button>
                </div>
                -->
                <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                >
                    {{ message }}
                </div>

                <div v-if="successful" style="text-align:center">
                    <router-link to="/login" class="text-center">Login</router-link>
                </div>
            </div>
            <!-- /.form-box -->
        </div>
        <!-- /.card -->
    </div>
    <!-- /.register-box -->
</template>

<script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as yup from "yup";

    var appElement = document.getElementById('app');

    export default {
    name: "register",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
        userid: yup
            .string()
            .required("userid is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
        username: yup
            .string()
            .required("username is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
        email: yup
            .string()
            .required("email is required!")
            .email("email is invalid!")
            .max(50, "Must be maximum 50 characters!"),
        password: yup
            .string()
            .required("password is required!")
            .min(6, "Must be at least 6 characters!")
            .max(40, "Must be maximum 40 characters!"),
        retypepassword: yup
            .string()
            .required("retype password is required!")
            .min(6, "Must be at least 6 characters!")
            .max(40, "Must be maximum 40 characters!")
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        });

        return {
            successful: false,
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        appElement.classList.add('register-page');
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    unmounted(){
        appElement.classList.remove('register-page');
    },
    methods: {
        handleRegister(user) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            this.$store.dispatch("auth/register", user).then(
                (data) => {
                this.message = data.message;
                this.successful = true;
                this.loading = false;
                },
                (error) => {
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful = false;
                this.loading = false;
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
