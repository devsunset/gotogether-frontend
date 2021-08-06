<template>
    <li class="nav-item dropdown user-menu" ref="dropdown">
        <button
            @click="toggleDropdown"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
        >
            <img
                src="../assets/img/default-profile.png"
                class="user-image img-circle elevation-2"
                alt="User Image"
            />
        </button>
        <ul
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
            :class="{'show':isDropdownOpened}"
        >
            <!-- User image -->
            <li class="user-header bg-primary">
                <img
                    src="../assets/img/default-profile.png"
                    class="img-circle elevation-2"
                    alt="User Image"
                />

                <div  v-if="currentUser">
                    <p>{{currentUser.username}}</p>
                    <!-- 
                    <p>
                        <strong>Token:</strong>
                        {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
                    </p>
                    <p>
                    <strong>Id:</strong>
                    {{currentUser.id}}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        {{currentUser.email}}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
                    </ul> 
                    -->
                </div>

                <p  v-if="!currentUser">
                    Guest
                </p>
            </li>
            <!-- Menu Footer-->
            <li class="user-footer">
                <router-link
                    to="/profile"
                    class="btn btn-default btn-flat"
                    @click="isDropdownOpened = false;"
                >
                    <p   v-if="currentUser">Profile</p>
                </router-link>
                <button
                    @click="login"
                    class="btn btn-default btn-flat float-right"
                >
                    Sign In
                </button>
            </li>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods : {
         login(){
            this.$router.push('/login');
         },
         logout(){
              this.$router.push('/login');
         },
       },
        mounted() {
        },
    };
</script>