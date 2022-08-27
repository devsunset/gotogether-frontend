<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0" v-if="category == 'TALK'">Post Talk</h1>
                <h1 class="m-0" v-else-if="category == 'QA'">Post Q&A</h1>
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
                <div class="card">
                   <div class="card-header">
                            <span class="card-title">
                                <button type="button" class="btn btn-block btn-success" style="width:100px;padding:0px;margin:0px" @click="goPostNew()" v-if="currentUser"> New</button>
                            </span>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 300px;">
                                     <select class="form-control" v-model="category" @change="getPostList('INIT')"> 
                                      <option value="TALK">Talk</option>
                                      <option value="QA">Q&A</option> 
                                  </select>
                                    <input type="text" name="keyword" class="form-control float-right" v-model="keyword" placeholder="Search" @keyup.enter="getPostList('INIT')">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default" @click="getPostList('INIT')">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>

                        <div class="card-body table-responsive p-0">
                            <table class="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th v-if="category == 'TALK'">Talk</th>
                                        <th v-else-if="category == 'QA'">Q&A</th>
                                        <th class="desktop" style="width: 5%">Reply</th>
                                        <th class="desktop" style="width: 5%">View</th>
                                        <th class="desktop" style="width: 5%">Nickname</th>
                                        <th class="desktop" style="width: 5%">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="index" v-for="(post,index) in posts" @click="goPostDetail(post.postId)">
                                        <td class="ellipsisMobile ellipsisDesktop">{{post.title}}</td>
                                        <td class="desktop">{{post.comment_count}}</td>
                                        <td class="desktop">{{post.hit}}</td>
                                        <td class="desktop">{{post.nickname}}</td>
                                        <td class="desktop"> {{post.createdDate.substring(2,16)}}</td>
                                    </tr>
                                    <tr v-if="posts.length == 0">
                                        <td colspan="5" style="text-align:center">No Data.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    <div class="card-footer clearfix">
                            <div class="float-right">
                             <v-pagination
                                    v-model="page"
                                    :pages="totalPages"
                                    :range-size="rangeSize "
                                    active-color="#29b3ed"
                                    @update:modelValue="getPostList"
                                />
                             </div>
                    </div>
                </div>
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
import PostService from "../services/post.service";
import VueElementLoading from "vue-element-loading";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "post",
        data() {
            return {
                category : "TALK",
                posts : [ ], 
                spinnerText: 'Loading ...  ',
                spinnerShow: false,
                spinnerKind: 'bar-fade-scale',
                spinnerColor: '#28a745',
                spinnerSize: '60',
                spinnerDuration: '0.6',
                keyword : "",
                page: 1,
                totalPages : 0,
                rangeSize  : 0,
                loading : false,
                color: '#007bff',
                size: '22px',
            };
        },
        created() {
            this.category = this.$route.query.category;
        },
        components: {
            VueElementLoading
            ,VPagination
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
            this.getPostList('INIT');
        },
          methods: {
            goPostNew() {
             this.$router.push({
                    name: "PostEdit",
                    query: { category: this.category },
                });
            },
            goPostDetail(postId) {
                sessionStorage.setItem('post_page', this.page);
                sessionStorage.setItem('post_totalPages', this.totalPages);
                sessionStorage.setItem('post_rangeSize', this.rangeSize);
                sessionStorage.setItem('post_category', this.category);
                sessionStorage.setItem('post_keyword', this.keyword);
                this.$router.push({
                    name: "PostDetail",
                    query: { "postId": postId },
                });
            },
            getPostList(flag) {
                if(flag == 'INIT'){
                    this.page = 1;
                    this.totalPages = 0;
                    this.rangeSize  = 0;
                }

                if(sessionStorage.getItem('post_back') == 'Y' && sessionStorage.getItem('post_page') !==null && sessionStorage.getItem('post_page') !==''){
                    this.page = sessionStorage.getItem('post_page');
                    this.totalPages = sessionStorage.getItem('post_totalPages');
                    this.rangeSize  = sessionStorage.getItem('post_rangeSize');
                    this.category =  sessionStorage.getItem('post_category');
                    this.keyword  = sessionStorage.getItem('post_keyword');
                }

                sessionStorage.setItem('post_back', 'N');
                sessionStorage.setItem('post_page', '');
                sessionStorage.setItem('post_totalPages', '');
                sessionStorage.setItem('post_rangeSize', '');
                sessionStorage.setItem('post_category', '');
                sessionStorage.setItem('post_keyword', '');

                this.spinnerShow = true;
                PostService.getPostList(this.page-1,10,{"category": this.category, "keyword" : this.keyword}).then(
                    (response) => {
                       this.page = response.data.data.number+1;
                       this.totalPages = response.data.data.totalPages;
                       this.rangeSize  = response.data.data.number;
                       this.posts = response.data.data.content;
                       this.spinnerShow = false;
                    },
                    (error) => {
                        this.page = 1;
                        this.totalPages = 0;
                        this.rangeSize  = 0;
                        this.spinnerShow = false;
                        this.posts = [] ;
                        console.log(
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString());
                    }
               );
            },
        },
};
</script>