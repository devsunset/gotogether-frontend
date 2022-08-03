<template>
    <li class="nav-item dropdown" ref="dropdown" v-if="currentUser">
        <button class="nav-link" data-toggle="dropdown" @click="toggleDropdown" aria-expanded="true">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">{{note}}</span>
            <i class="far fa-bell"></i>
        </button>
        <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
            :class="{'show':isDropdownOpened}"
        >
            <span class="dropdown-item dropdown-header">{{note}} New Note</span>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer"
                >See All Note</a
            >
        </div>
    </li>
</template>

<script>
import NoteService from "../services/note.service";

export default {
  name: "notifications",
  data() {
    return {
      note: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if(this.$store.state.auth.user){
        NoteService.getNewReceiveNote().then(
        (response) => {
            this.together = response.data.data.NOTE;
        },
        (error) => {
            console.log((error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString());
        }
        );
    }
  },
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
</script>
