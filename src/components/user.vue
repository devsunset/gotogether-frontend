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

                <p>
                    devsunset
                </p>
            </li>
            <!-- Menu Footer-->
            <li class="user-footer">
                <router-link
                    to="/profile"
                    class="btn btn-default btn-flat"
                    @click="isDropdownOpened = false;"
                >
                    Profile
                </router-link>
                <button
                    @click="login"
                    class="btn btn-default btn-flat float-right"
                >
                    Sign in
                </button>
            </li>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "profile",
        data() {
            return {
            };
        },
         methods : {
            login(){
                this.$router.push('/login');
            },
        }
    };

    // private isDropdownOpened = false;

    // public mounted(): void {
    //     document.addEventListener('click', this.documentClick);
    // }

    // public unmounted(): void {
    //     document.removeEventListener('click', this.documentClick);
    // }

    // private toggleDropdown() {
    //     this.isDropdownOpened = !this.isDropdownOpened;
    // }

    // private documentClick(event: Event) {
    //     const el: HTMLElement = this.$refs.dropdown as HTMLElement;
    //     const target: HTMLElement = event.target as HTMLElement;
    //     if (el !== target && !el.contains(target)) {
    //         this.isDropdownOpened = false;
    //     }
    // }

    // private logout() {
    //     this.$router.push('/login');
    // }
</script>

<style scoped>
    /* .user-menu {
        .user-image {
            width: 1.6rem !important;
            height: 1.6rem !important;
        }
    } */
</style>>
