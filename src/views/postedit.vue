<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Post Edit</h1>
            </div>
            <!-- /.col -->
           
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div>
                       <!-- ////////////////////////////////////////////////// -->
                        <div class="card card-primary card-outline">
                        <div class="card-header">
                        <h3 class="card-title">New Post
                        </h3></div>

                        <div class="card-body">
                        <div class="form-group">
                        <input class="form-control" placeholder="Category">
                        </div>
                        <div class="form-group">
                        <input class="form-control" placeholder="Title">
                        </div>
                        <div class="form-group"> 
                            body
                        </div>
                        </div>

                        <div class="card-footer">
                        <div class="float-right">
                        <button type="submit" class="btn btn-danger" style="margin-left: 45px;">Submit</button>
                        </div>
                        </div>

                        </div>
                        <!-- ////////////////////////////////////////////////// -->
        </div>
    </div>
    <!-- /.container-fluid -->
</section>

    <VueElementLoading
        :spinner="spinnerKind"
        :size="spinnerSize"
        :duration="spinnerDuration"
        :color="spinnerColor"
        :active=" spinnerShow"
        :text="spinnerText"
        backgroundColor="transparent"
      /> 

<!-- /.content -->
</template>

<script>
// import PostService from "../services/post.service";
import VueElementLoading from "vue-element-loading";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "postedit",
        data() {
            return {
                posts : [ ], 
                spinnerText: 'Loading ...  ',
                spinnerShow: false,
                spinnerKind: 'bar-fade-scale',
                spinnerColor: '#28a745',
                spinnerSize: '60',
                spinnerDuration: '0.6',
                keyword : "",
                loading : false,
                color: '#007bff',
                size: '22px',
            };
        },
        created() {
            alert(this.$route.query.category);
        },
        components: {
            VueElementLoading
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted(){
            if(this.currentUser){
                const user = JSON.parse(localStorage.getItem('user'));
                 this.userid = user.username;
                 this.nickname = user.nickname;
                 this.email = user.email;
                 this.roles= user.roles[0];
            }
        },
          methods: {
            getPostList() {
                this.spinnerShow = true;
            },
        },
};
</script>