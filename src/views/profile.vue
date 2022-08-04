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
                                    src="https://avatars.githubusercontent.com/u/9853358?v=4"
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
                            <ul class="nav nav-pills">
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
                                        >Skill</a
                                    >
                                </li>
                            </ul>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="active tab-pane" id="activity">
                                    <strong><i class="fas fa-pencil-alt mr-1"></i> Introduce</strong>
                                    <p class="text-muted">
                                    {{introduce}}
                                    </p>
                                    <hr />
                                    <strong><i class="far fa-file-alt mr-1"></i> Note</strong>
                                    <p class="text-muted">
                                    {{note}}
                                    </p>
                                   <strong><i class="far fa-file-alt mr-1"></i> Github</strong>
                                    <p class="text-muted">
                                    {{github}}
                                    </p>
                                    <strong><i class="far fa-file-alt mr-1"></i>Homepage</strong>
                                    <p class="text-muted">
                                    {{homepage}}
                                    </p>
                                </div>
                                <!-- /.tab-pane -->
                                 <!-- /.tab-pane -->
                                <div class="tab-pane" id="Skill">
                                    Skill
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
            }
            this.getUserInfo();
            this.getUserSkill();
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
            getUserSkill() {
                UserService.getUserInfo().then(
                    (response) => {
                            console.log(response);
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