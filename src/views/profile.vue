<template>
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Profile</h1>
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
                            <!-- <p>
                                <strong>Email:</strong>
                                {{email}}
                            </p> -->
                            <!-- <p>
                            <strong>Authorities:</strong>
                                {{roles}}
                            </p>  -->
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
                                    <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                                    <button type="submit" class="btn btn-danger" style="margin-left:45px" @click="setUserInfoSave()" v-show='!loading' >Submit</button>
                                </li>
                            </ul>
                            
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="active tab-pane" id="activity" style="min-height:285px">
                                        <div class="form-group row">
                                        <label for="inputName" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Introduce</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control"  placeholder="한줄 소개" v-model="introduce" maxlength="255">
                                        </div>
                                        </div>
                                        <div class="form-group row">
                                        <label for="inputExperience" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Note</label>
                                        <div class="col-sm-10">
                                        <textarea class="form-control"  placeholder="자기 소개" v-model="note" maxlength="1000"></textarea>
                                        </div>
                                        </div>
                                         <div class="form-group row">
                                        <label for="inputEmail" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Github</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="Github" v-model="github" maxlength="500">
                                        </div>
                                        </div>
                                         <div class="form-group row">
                                        <label for="inputName2" class="col-sm-2 col-form-label"><i class="far fa-file-alt mr-1"></i>Homepage</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="Homepage" v-model="homepage" maxlength="500">
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
                                                <tr :key="index" v-for="(item,index) in items">
                                                    <td><input type="text" name="skill_item" class="form-control" @change='checkvalue' placeholder="skill을 입력해주세요" v-model="item.item" maxlength="100"></td>
                                                    <td>
                                                         <select class="form-control" v-model="item.level" name="skill_level"> 
                                                            <option value="BASIC">기본 학습</option>
                                                            <option value="JOB">업무 사용</option>
                                                            <option value="INTEREST">관심 있음</option>
                                                            <option value="TOY_PROJECT">Toy Pjt.</option> 
                                                        </select>
                                                    </td>
                                                    <td><button type="button" @click="setMinusSkill(index)" class="btn btn-block btn-success btn-sm" v-if="index != items.length - 1">-</button><button type="button" @click="setAddSkill()" class="btn btn-block btn-warning btn-sm" v-if="index == items.length - 1">+</button></td>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: "profile",
        data() {
            return {
                loading : false,
                color: '#007bff',
                size: '30px',
                userid : "",
                nickname : "",
                email : "",
                roles : "",
                userInfoId : "",
                introduce : "",
                note : "",
                github : "",
                homepage : "",
                items : [ ] 
            };
        },
        components: {
            'PulseLoader': PulseLoader 
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
              setUserInfoSave() {
                var skill = "";
                this.items.forEach(function(d){
                    let tmp = d.item.trim().replace(/\|/g,'').replace(/\^/g,'');
                    if(tmp !='' ){
                        skill +=tmp+'^'+d.level+"|"
                    } 
                })

                if(skill !=''){
                    skill  = skill.substring(0,skill.length -1)
                }

                this.$confirm("저장 하시겠습니까?").then(() => {
                this.loading = true;
                 UserService.setUserInfoSave({"introduce": this.introduce, "note" : this.note, "github" : this.github, "homepage" : this.homepage, "skill" : skill} ).then(
                    (response) => {
                        this.loading = false;
                        if(response.data.result =="S"){
                            this.$toast.success(`Success.`);
                            this.getUserInfo();
                        }else{
                              this.$toast.error(`Fail.`);
                        }
                    },
                    (error) => {
                        this.loading = false;
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
             setAddSkill() {
                this.items.push({ item:"", level:"INTEREST"});
             },
             setMinusSkill(idx) {
                  this.items.splice(idx, 1)
             },
            getUserInfo() {
                UserService.getUserInfo().then(
                    (response) => {
                        if(response.data.data !=null){
                            this.userInfoId = response.data.data.userInfoId ;
                            this.introduce = response.data.data.introduce;
                            this.note = response.data.data.note;
                            this.github = response.data.data.github;
                            this.homepage  = response.data.data.homepage ;

                            if(response.data.data.skill === undefined || response.data.data.skill == null || response.data.data.skill === ""){
                                 this.items = [
                                    {"item" : "", "level" : "INTEREST"}
                                ] ;
                            }else{
                                this.items = [] ;
                                var data = response.data.data.skill.split("|");
                                var skills = [] ;
                                data.forEach(function(d){
                                    var datasub = d.split('^');
                                    skills.push({ item:datasub[0], level:datasub[1] });
                                })
                                this.items = skills; 
                            }
                        }else{
                            this.items = [
                                {"item" : "", "level" : "INTEREST"}
                            ] ;
                        }
                    },
                    (error) => {
                          this.items = [
                                    {"item" : "", "level" : "INTEREST"}
                                ] ;
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
