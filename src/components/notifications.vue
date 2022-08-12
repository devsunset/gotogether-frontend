<template>
    <li class="nav-item dropdown" ref="dropdown" v-if="currentUser">
        <button class="nav-link" data-toggle="dropdown" @click="toggleDropdown" aria-expanded="true">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">{{memo}}</span>
            <i class="far fa-bell"></i>
        </button>
        <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
            :class="{'show':isDropdownOpened}"
        >
            <span @click="goNote"  class="dropdown-item dropdown-header">{{memo}} New Memo</span>
            <div class="dropdown-divider"></div>
            <a href="#"  @click="goMemo" class="dropdown-item dropdown-footer"
                >See All Memo</a
            >
        </div>
    </li>
</template>

<script>
import MemoService from "../services/memo.service";

export default {
  name: "notifications",
  data() {
    return {
      memo: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.getMemo();
    // Memo 에서 갱신이 되면 호출
    this.emitter.on('notificationRefresh',()=>{
         setTimeout(() => {
                 this.getMemo();
            }, 1000);
    })
  },
    methods: {
    goMemo() {
      this.$router.push('/memo');
    },
     getMemo() {
          if(this.$store.state.auth.user){
              MemoService.getNewReceiveMemo().then(
              (response) => {
                    if(response.data.result =="S"){
                          this.memo = response.data.data.MEMO;
                        }else{
                          this.memo = 0;
                        }
              },
              (error) => {
                this.memo = 0;
                  console.log((error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString()); 
              }
              );
          }
    },
  },
};
</script>
