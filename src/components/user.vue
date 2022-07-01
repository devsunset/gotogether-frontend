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
                    <p>{{currentUser.nickaname}}</p>
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
                     <p  v-if="currentUser">
                       Sign Out
                    </p>
                    <p  v-if="!currentUser">
                       Sign In
                    </p>
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
            if(this.currentUser){
                this.$store.dispatch('auth/logout')
                this.$router.push('/')
            }else{
                this.$router.push('/login')
            }
         }
       },
        mounted() {
        },
    };
</script>