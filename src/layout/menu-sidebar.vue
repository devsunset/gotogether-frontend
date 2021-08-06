<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <router-link to="/" class="brand-link">
            <img
                src="../assets/img/logo.png"
                alt="Go Together Logo"
                class="brand-image img-circle elevation-3"
                style="opacity: 0.8"
            />
            <span class="brand-text font-weight-light">Go Together</span>
        </router-link>

        <div class="sidebar">
            <nav class="mt-2">
                <ul
                    class="nav nav-pills nav-sidebar flex-column"
                    data-widget="treeview"
                    role="menu"
                    data-accordion="false"
                >
                    <li class="nav-item">
                        <router-link
                            to="/"
                            class="nav-link"
                            exact
                            exact-active-class="active"
                        >
                            <i class="nav-icon fas fa-th"></i>
                            <p>Go Together</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            to="/location"
                            class="nav-link"
                            exact
                            exact-active-class="active"
                        >
                            <i class="nav-icon fas fa-map-marker"></i>
                            <p>Location</p>
                        </router-link>
                    </li>
                    <li class="nav-item"    v-if="currentUser">
                        <router-link
                            to="/profile"
                            class="nav-link"
                            active-class="active"
                        >
                            <i class="nav-icon fas fa-user"></i>
                            <p>Profile</p>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
export default {
name: "menu-sidbar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  }
};
</script>