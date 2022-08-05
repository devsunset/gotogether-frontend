<template>
`    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Profile</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active">Profile</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <!-- Profile Image -->
                    <div class="card card-primary card-outline">
                        <div class="card-body box-profile">
                            <div class="text-center">
                                <img
                                    class="profile-user-img img-fluid img-circle"
                                    src="../assets/img/devsunset.jpg"
                                    alt="User profile picture"
                                />
                            </div>
                            <h3 class="profile-username text-center">
                                 <div  v-if="currentUser">
                                    <p>{{nickname}}</p>
                                 </div>
                            </h3>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->

                    <!-- About Me Box -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">About Me</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div  v-if="currentUser">
                            <p>
                            <strong>UserId:</strong>
                            {{userid}}
                            </p>
                            <p>
                            <strong>Nickname:</strong>
                            {{nickname}}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                {{email}}
                            </p>
                            <p>
                            <strong>Authorities:</strong>
                                {{roles}}
                            </p> 
                        </div>
                           
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header p-2">
                            <ul class="nav nav-pills" style="float:right">
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        href="#activity"
                                        data-toggle="tab"
                                        >Info</a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        href="#Skill"
                                        data-toggle="tab"
                                        >Skills</a
                                    >
                                </li>
                                <li>
                                    <button type="submit" class="btn btn-danger" style="margin-left:45px">Submit</button>
                                </li>
                            </ul>
                            
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="active tab-pane" id="activity">
                                        <div class="form-group row">
                                        <label for="inputName" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Introduce</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control"  placeholder="한줄 소개" v-model="introduce">
                                        </div>
                                        </div>
                                        <div class="form-group row">
                                        <label for="inputExperience" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Note</label>
                                        <div class="col-sm-10">
                                        <textarea class="form-control"  placeholder="자기 소개" v-model="note"></textarea>
                                        </div>
                                        </div>
                                         <div class="form-group row">
                                        <label for="inputEmail" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Github</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="Github" v-model="github">
                                        </div>
                                        </div>
                                         <div class="form-group row">
                                        <label for="inputName2" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Homepage</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="Homepage" v-model="homepage">
                                        </div>
                                        </div>
                                </div>
                                <!-- /.tab-pane -->
                                 <!-- /.tab-pane -->
                                <div class="tab-pane" id="Skill">
                                    
                                    <div class="card">
                                            <div class="card-header">
                                            <h3 class="card-title">Skill 항목을 추가해 주세요.</h3>
                                            </div>

                                            <div class="card-body p-0">
                                            <table class="table table-striped">
                                            <thead>
                                            <tr>
                                            <th>Item</th>
                                            <th>Level</th>
                                            <th style="width: 40px"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td><input type="text" class="form-control" placeholder="skill"></td>
                                                <td>
                                                        <select class="form-control">
                                                        <option value="INTEREST">관심있음</option>
                                                        <option value="HELLO_WORLD">Hello Word</option>
                                                        <option value="BASIC">기본 공부</option>
                                                        <option value="TOY_PROJECT">Toy Pjt. 개발 </option> 
                                                        <option value="JOB_BEGINNER">업무 기본 사용</option>
                                                        <option value="JOB_PROFESSIAL">업무 많이 사용</option> 
                                                        </select>
                                                </td>
                                                <td><button type="button" class="btn btn-block btn-warning btn-sm">-</button></td>
                                                </tr>
                                                      <tr>
                                                <td><input type="text" class="form-control" placeholder="skill"></td>
                                                <td>
                                                        <select class="form-control">
                                                        <option value="INTEREST">관심있음</option>
                                                        <option value="HELLO_WORLD">Hello Word</option>
                                                        <option value="BASIC">기본 공부</option>
                                                        <option value="TOY_PROJECT">Toy Pjt. 개발 </option> 
                                                        <option value="JOB_BEGINNER">업무 기본 사용</option>
                                                        <option value="JOB_PROFESSIAL">업무 많이 사용</option> 
                                                        </select>
                                                </td>
                                                <td><button type="button" class="btn btn-block btn-success btn-sm">+</button></td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            </div>

                                            </div>


                                </div>
                                <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div>
                        <!-- /.card-body -->
                    </div>
                       
                    <!-- /.card -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
    </section>`
</template>

<script>
import UserService from "../services/user.service";

    export default {
        name: "profile",
        data() {
            return {
                userid : "",
                nickname : "",
                email : "",
                roles : "",
                userInfoId : "",
                introduce : "",
                note : "",
                github : "",
                homepage : "",
                profileImageLink : "",
            };
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

                this.getUserInfo();
            }
         
        },
         methods: {
            getUserInfo() {
                UserService.getUserInfo().then(
                    (response) => {
                        if(response.data.data !=null){
                            this.userInfoId = response.data.data.userInfoId ;
                            this.introduce = response.data.data.introduce;
                            this.note = response.data.data.note;
                            this.github = response.data.data.github;
                            this.homepage  = response.data.data.homepage ;
                            this.profileImageLink  = response.data.data.profileImageLink ;
                        }
                    },
                    (error) => {
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