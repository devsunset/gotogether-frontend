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
                                    <p>{{currentUser.username}}</p>
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
                            {{currentUser.username}}
                            </p>
                            <p>
                            <strong>Nickname:</strong>
                            {{currentUser.nickname}}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                {{currentUser.email}}
                            </p>
                            <strong>Authorities:</strong>
                            <ul>
                                <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
                            </ul> 
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
                                    하루에 한가지씩 배우기
                                    </p>
                                    <hr />
                                    <strong><i class="far fa-file-alt mr-1"></i> Note</strong>
                                    <p class="text-muted">
                                    Talk is Cheap. Show me the Code.   - Linus Torvalds
                                    </p>
                                   <strong><i class="far fa-file-alt mr-1"></i> Github</strong>
                                    <p class="text-muted">
                                    Github
                                    </p>
                                    <strong><i class="far fa-file-alt mr-1"></i>Homepage</strong>
                                    <p class="text-muted">
                                    Homepage
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
    export default {
        name: "profile",
        data() {
            return {
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
    };
</script>