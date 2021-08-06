<template>
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">                
                <router-link to="/"><b>Go</b>Together</router-link>
            </div>
            <div class="card-body">
                <p class="login-box-msg">
                    You forgot your password? Here you can easily retrieve a new
                    password.
                </p>
                <form>
                    <div class="input-group mb-3">
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                        />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-3">
                            <button type="submit" class="btn btn-primary btn-block">
                                Request new password
                            </button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
                <p class="mt-3 mb-1">
                    <router-link to="/login">Login</router-link>
                </p>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->
</template>

<script>
    var appElement = document.getElementById('app');

    export default {
        name: "forgot-password",
        data() {
            return {
            };
        },mounted() {
            appElement.classList.add('login-page');
        },unmounted(){
            appElement.classList.remove('login-page');
        }
    };
</script>
