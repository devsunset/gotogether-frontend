<template>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/">
                <button class="nav-link" role="button" @click="onToggleMenuSidebar">
                    <i class="fas fa-bars"></i>
                </button>
               </router-link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <notifications-dropdown></notifications-dropdown>        
            <user-dropdown></user-dropdown>
            <!-- <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li> -->
        </ul>
    </nav>
</template>

<script>
import Notifications from '../components/notifications.vue';
import User from '../components/user.vue';

    export default {
        name: "header",
        data() {
            return {
            };
        },
        components: {
            'notifications-dropdown': Notifications,
            'user-dropdown': User
        }
    };

    // public onToggleMenuSidebar(): void {
    //     this.$emit('toggle-menu-sidebar');
    // }
</script>

