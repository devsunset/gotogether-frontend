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
            <span @click="goNote"  class="dropdown-item dropdown-header">{{note}} New Note</span>
            <div class="dropdown-divider"></div>
            <a href="#"  @click="goNote" class="dropdown-item dropdown-footer"
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
    methods: {
    goNote() {
     this.$router.push('/note');
    },
  },
};
</script>
