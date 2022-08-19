<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0" v-if="this.category == 'TALK'">Post Detail Talk</h1>
                <h1 class="m-0" v-else-if="this.category == 'QA'">Post Detail Q&A</h1>
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
                        <h3 class="card-title"><i class="nav-icon fas fa-user"></i> &nbsp;{{writerNickname}}<br><i class="nav-icon fas fa-edit"></i>&nbsp;{{modifiedDate}}</h3>
                        <div style="float:right">
                        <i class="fas fa-eye fa-fw" style="color: var(--fa-navy);"></i>&nbsp;{{hit}} 
                        </div>
                        </div>

                        <div class="card-body">
                        <div class="form-group">
                                <select class="form-control" v-model="category" disabled> 
                                      <option value="TALK">Talk</option>
                                      <option value="QA">Q&A</option> 
                                  </select>
                        </div>
                        <div class="form-group">
                        <input class="form-control" placeholder="Title" v-model="title" disabled>
                        </div>
                        <div class="form-group"> 
                        <div class="col-md" style="padding:0px">
                        <div class="card card-info">
                        <div class="card-header" style="height:40px">
                        <span class="card-title"></span>
                        <div class="card-tools">
                        </div>
                        </div>
                        <div class="card-body" style="display: block;">
                                <p v-html="content" style="min-height:200px"></p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="card-footer">
                        <div class="float-right">
                        <button v-if="userid == writerUsername" type="submit" class="btn btn-danger" style="margin-left: 15px;" @click="setDelete">Delete</button>
                        <button v-if="userid == writerUsername" type="submit" class="btn btn-primary" style="margin-left: 15px;" @click="goEdit">Edit</button>
                        <button type="submit" class="btn btn-info" style="margin-left: 15px;" @click="goPost">List</button>
                        </div>
                        </div>

                        </div>
                        <!-- ////////////////////////////////////////////////// -->
        </div>
    </div>
    <!-- /.container-fluid -->
</section>


<!-- /.content -->
</template>

<script>
import PostService from "../services/post.service";

export default {
  name: "postedit",
        data() {
            return {
                category : 'TALK',
                title : '',
                content : '',
                hit : 0,
                writerNickname : "",
                writerUsername : "",
                modifiedDate : "",
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
           PostService.getPost(this.$route.query.postId).then(
                    (response) => {
                        if(response.data.result == 'S'){
                            this.category = response.data.data.category;
                            this.title = response.data.data.title;
                            this.content = response.data.data.content;
                            this.hit = response.data.data.hit;
                            this.writerNickname = response.data.data.nickname;
                            this.writerUsername = response.data.data.username;
                            this.modifiedDate = response.data.data.modifiedDate;
                        }else{
                            this.$toast.error(`Fail.`);
                        }
                    },
                    (error) => {
                        this.$toast.error(`Fail.`);
                        console.log(
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString());
                    }
            );
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
            goPost() {
                this.$router.push({
                    name: "Post",
                    query: { category: this.category },
                });
            },
            goEdit() {
                this.$router.push({
                    name: "PostEdit",
                    query: { category: this.category, postId: this.$route.query.postId },
                });
            },
             setDelete() {
                    this.$confirm("삭제 하시겠습니까?").then(() => {
                            PostService.deletePost(this.$route.query.postId).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.$toast.success(`Success.`);
                                        this.$router.push({
                                            name: "Post",
                                            query: { category: this.category },
                                        });
                                    }else{
                                            this.$toast.error(`Fail.`);
                                    }
                                },
                                (error) => {
                                    this.$toast.error(`Fail.`);
                                    console.log(
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString());
                                }
                        );
                    
                 }).catch(() => console.log('no selected'));
            },
        },
};
</script>
