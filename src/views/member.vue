<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Member</h1>
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
                            <h3 class="card-title"></h3>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 270px;">
                                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <p/>

                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="nav-icon fas fa-edit"></i>devsunset</h3>
                                <div class="card-tools">
                                        2022-07-22
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td width="10%"><b>Introduce</b></td>
                                            <td>
                                                한줄소개
                                            </td>
                                        </tr>
                                         <tr>
                                            <td><b>Note</b></td>
                                            <td>
                                                한줄소개222222
                                            </td>
                                        </tr>
                                         <tr>
                                            <td><b>Github</b></td>
                                            <td>
                                                한줄소개222222
                                            </td>
                                        </tr>
                                         <tr>
                                            <td><b>Homepage</b></td>
                                            <td>
                                                한줄소개222222
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>Skill</b></td>
                                            <td>
                                                <span class="badge bg-warning m3"  style="margin-right:3px">Backend</span>
                                                <span class="badge bg-success"  style="margin-right:3px">Frontend</span>
                                                <span class="badge bg-danger"  style="margin-right:3px">DB</span>
                                                <span class="badge bg-primary"  style="margin-right:3px">CI/CD</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    


                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-right">
                            <li class="page-item"><a class="page-link" href="#">«</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">»</a></li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "member",
        data() {
            return {
                loading : false,
                color: '#007bff',
                size: '30px',
                items : [ ] 
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

                this.getUserSeach();
            }
         
        },
          methods: {
            getUserSeach() {
                UserService.getUserInfo().then(
                    (response) => {
                        if(response.data.data !=null){
                            alert('a')
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

<style>

</style>