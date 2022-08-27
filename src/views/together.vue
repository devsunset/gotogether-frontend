<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Together</h1>
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
                                <button type="button" class="btn btn-block btn-success" style="width:100px;padding:0px;margin:0px" @click="goTogetherNew()" v-if="currentUser"> New</button>
                            </span>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 300px;">
                                    <input type="text" name="keyword" class="form-control float-right" v-model="keyword" placeholder="Search" @keyup.enter="getTogetherList('INIT')">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default" @click="getTogetherList('INIT')">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>

                        <div class="card-body table-responsive p-0">
                          <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Together</th>                                   
                                    <th class="desktop" style="width: 50px">Progress</th>
                                    <th style="width: 40px"></th>
                                    <th class="desktop" style="width: 50px">Reply</th>
                                    <th class="desktop" style="width: 50px">View</th>
                                    <th class="desktop" style="width: 50px">Nickname</th>
                                    <th class="desktop" style="width: 150px">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="togethers.length == 0">
                                    <td colspan="7" style="text-align:center">No Data.</td>
                                </tr>
                                <!-- progress 0~25 : danger   26~50 :  warning  51~75 :  primary  76~ 100  :  success-->
                                <tr :key="index" v-for="(together,index) in togethers" @click="goTogetherDetail(together.togetherId)">
                                    <td class="ellipsisMobile ellipsisDesktop">{{together.title}}</td>
                                    <td class="desktop">
                                        <div class="progress progress-xs">
                                            <div :class="'progress-bar bg-'+together.progressLegend" :style="'width: '+together.progress+'%'"></div>
                                        </div>
                                    </td>
                                    <td><span :class="'badge bg-'+together.progressLegend">{{together.progress}}%</span></td>
                                    <td class="desktop">{{together.togetherComment_count}}</td>
                                    <td class="desktop">{{together.hit}}</td>
                                    <td class="desktop">{{together.nickname}}</td>
                                    <td class="desktop">{{together.createdDate.substring(2,16)}}</td>
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
                                    @update:modelValue="getTogetherList"
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
import TogetherService from "../services/together.service";
import VueElementLoading from "vue-element-loading";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "together",
        data() {
            return {
                category : "",
                togethers : [ ], 
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
            this.getTogetherList('INIT');
        },
          methods: {
            goTogetherNew() {
             this.$router.push({
                    name: "TogetherEdit",
                });
            },
            goTogetherDetail(togetherId) {
                sessionStorage.setItem('together_page', this.page);
                sessionStorage.setItem('together_totalPages', this.totalPages);
                sessionStorage.setItem('together_rangeSize', this.rangeSize);
                sessionStorage.setItem('together_keyword', this.keyword);
                this.$router.push({
                    name: "TogetherDetail",
                    query: { "togetherId": togetherId },
                });
            },
            getTogetherList(flag) {
                if(flag == 'INIT'){
                    this.page = 1;
                    this.totalPages = 0;
                    this.rangeSize  = 0;
                }

                if(sessionStorage.getItem('together_back') == 'Y' && sessionStorage.getItem('together_page') !==null && sessionStorage.getItem('together_page') !==''){
                    this.page = sessionStorage.getItem('together_page');
                    this.totalPages = sessionStorage.getItem('together_totalPages');
                    this.rangeSize  = sessionStorage.getItem('together_rangeSize');
                    this.keyword  = sessionStorage.getItem('together_keyword');
                }

                sessionStorage.setItem('together_back', 'N');
                sessionStorage.setItem('together_page', '');
                sessionStorage.setItem('together_totalPages', '');
                sessionStorage.setItem('together_rangeSize', '');
                sessionStorage.setItem('together_keyword', '');

                this.spinnerShow = true;
                TogetherService.getTogetherList(this.page-1,5,{"category": '', "keyword" : this.keyword}).then(
                    (response) => {
                       this.page = response.data.data.number+1;
                       this.totalPages = response.data.data.totalPages;
                       this.rangeSize  = response.data.data.number;
                       this.togethers = response.data.data.content;
                       this.spinnerShow = false;
                    },
                    (error) => {
                        this.page = 1;
                        this.totalPages = 0;
                        this.rangeSize  = 0;
                        this.spinnerShow = false;
                        this.togethers = [];
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