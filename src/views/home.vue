<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Home</h1>
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
        <!-- Small boxes (Stat box) -->
        <div class="row">
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <h3>{{together}}</h3>

                        <p>Together</p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-comments"></i>
                    </div>
                    <router-link to="/together" class="small-box-footer"
                        >More info <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3>{{user}}</h3>

                        <p>Member</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <router-link to="/member" class="small-box-footer"
                        >More info <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                         <h3>{{talk}}</h3>
                        <p>Talk</p>
                    </div>
                    <div class="icon">
                        <i class="far fa-keyboard"></i>
                    </div>
                    <router-link  :to="{name: 'Post', query: {category: 'TALK'}}" class="small-box-footer"
                        >More info <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <h3>{{qa}}</h3>

                        <p>Q&amp;A</p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-question"></i>
                    </div>
                    <router-link  :to="{name: 'Post', query: {category: 'QA'}}" class="small-box-footer"
                        >More info <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</section>

<div v-if="notice !=''" class="callout callout-info" style="margin:10px">
<h5><i class="fas fa-info"></i> Notice</h5>
    <p style="text-align:center" v-html="notice"></p>
</div>

<div class="card" style="padding:15px;margin:10px">
    <div class="card-header">
        <h3 class="card-title"><b>Recent Together Top 3</b></h3>
    </div>

    <div class="card-body p-0">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Together</th>                                   
                    <th>Progress</th>
                    <th style="width: 40px"></th>
                    <th>Involve</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="recentTogether.length == 0">
                     <td colspan="5" style="text-align:center">No Data.</td>
                </tr>
                <!-- progress 0~25 : danger   26~50 :  warning  51~75 :  primary  76~ 100  :  success-->
                <tr :key="index" v-for="(data,index) in recentTogether" @click="goTogetherDetail(data.togetherId)">
                    <td>{{data.title}}</td>
                    <td>
                        <div class="progress progress-xs">
                            <div :class="'progress-bar bg-'+data.progressLegend" :style="'width: '+data.progress+'%'"></div>
                        </div>
                    </td>
                    <td><span :class="'badge bg-'+data.progressLegend">{{data.progress}}%</span></td>
                    <td>{{data.involveType}}</td>
                    <td>{{data.createdDate.substring(2,10)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- /.content -->
</template>

<script>
import CommonService from "../services/common.service";

export default {
  name: "dashboard",
  data() {
    return {
      notice: "",
      together: 0,
      user: 0,
      talk : 0,
      qa : 0,
      recentTogether : [],
    };
  },
  mounted: function () {
     this.getHome();
    }
 ,
  methods: {
    getHome() {
         CommonService.getHome().then(
            (response) => {
                this.together = response.data.data.TOGETHER;
                this.user = response.data.data.USER;
                this.talk = response.data.data.TALK;
                this.qa = response.data.data.QA;
                this.notice = response.data.data.NOTICE;
                this.recentTogether  = response.data.data.RECENT_TOGETHER;
            },
            (error) => {
                this.notice =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            }
            );
    },
    goTogetherDetail(togetherId){
       console.log('To-Do : '+togetherId)
    },
  },
};
</script>
