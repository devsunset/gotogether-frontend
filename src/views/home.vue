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
                    <router-link to="/talk" class="small-box-footer"
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
                    <router-link to="/qa" class="small-box-footer"
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
<p style="text-align:center" v-html="notice"></p>
<div class="card" style="padding:15px;margin:10px">
    <div class="card-header">
        <h3 class="card-title">Recent Project</h3>
    </div>

    <div class="card-body p-0">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Together</th>                                   
                    <th>Progress</th>
                    <th style="width: 40px"></th>
                    <th>Nickname</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr>
                    <td>GoTogether Toy Project 함께 공부하며 만들어 가실 분 ^^</td>
                    <td>
                        <div class="progress progress-xs">
                            <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
                        </div>
                    </td>
                    <td><span class="badge bg-danger">55%</span></td>
                    <td>devsunset</td>
                    <td>22-06-29 10:30</td>
                </tr>
                <tr>
                    <td>FullStack 개발 스터디</td>
                    <td>
                        <div class="progress progress-xs">
                            <div class="progress-bar bg-warning" style="width: 70%"></div>
                        </div>
                    </td>
                    <td><span class="badge bg-warning">70%</span></td>
                    <td>devsunset</td>
                    <td>22-06-29 10:30</td>
                </tr>
                <tr>
                    <td>코딩 테스트 준비 모임</td>
                    <td>
                        <div class="progress progress-xs progress-striped active">
                            <div class="progress-bar bg-primary" style="width: 30%"></div>
                        </div>
                    </td>
                    <td><span class="badge bg-primary">30%</span></td>
                    <td>devsunset</td>
                    <td>22-06-29 10:30</td>
                </tr>
                <tr>
                    <td>공모전 참가팀 인원 충원</td>
                    <td>
                        <div class="progress progress-xs progress-striped active">
                            <div class="progress-bar bg-success" style="width: 90%"></div>
                        </div>
                    </td>
                    <td><span class="badge bg-success">90%</span></td>
                    <td>devsunset</td>
                    <td>22-06-29 10:30</td>
                </tr> -->
            </tbody>
        </table>
    </div>
</div>
<!-- /.content -->
</template>

<script>
import CommonService from "../services/common.service";
// import TogetherService from "../services/together.service";
// this.currentUser['roles'].includes('ROLE_ADMIN');

export default {
  name: "dashboard",
  data() {
    return {
      notice: "",
      together: 0,
      user: 0,
      talk : 0,
      qa : 0
    };
  },
  mounted: function () {
     this.getHome();
     this.getRecentTogether();
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
     getRecentTogether() {
         console.log('to-do')
        //  TogetherService.getRecentTogether().then(
        //     (response) => {
        //             console.log(response)//alert(JSON.stringify(response));
        //     },
        //     (error) => {
        //         this.notice =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        //     }
        //     );
    },
  },
};
</script>
