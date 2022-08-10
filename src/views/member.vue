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
                            <span class="card-title">
                                    <span class="badge bg-success"  style="margin-right:3px">기본 학습</span>
                                    <span class="badge bg-danger"  style="margin-right:3px">업무 사용</span>
                                    <span class="badge bg-warning"  style="margin-right:3px">관심 있음</span>
                                    <span class="badge bg-primary"  style="margin-right:3px">Toy Pjt.</span>
                                    &nbsp;
                                    <span class="form-check">
                                        <input type="checkbox" class="form-check-input" id="userDetailView" v-model="memberDetailView" @change="detailVisible($event)"><label class="form-check-label" for="userDetail">Member Detail View</label>
                                    </span>
                            </span>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 300px;">
                                    <input type="text" name="keyword" class="form-control float-right" v-model="keyword" placeholder="Search" @keyup.enter="getUserInfoList('INIT')">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default" @click="getUserInfoList('INIT')">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <p/>



                    <div class="col-12" :key="index" v-for="(member,index) in members">
                        <div class="card">
                            <div class="card-header" v-on:click="displayBody(index)">
                                <h3 class="card-title"><i class="nav-icon fas fa-user"></i>&nbsp;{{member.nickname}}</h3>
                                <div class="card-tools">
                                        {{member.modifiedDate.substring(2,10)}}
                                </div>
                            </div>
                            <div class="card-body" v-show="membersBodyDisplay[index]">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td width="10%"><b>Introduce</b></td>
                                            <td>
                                                {{member.introduce}}
                                            </td>
                                        </tr>
                                         <tr>
                                            <td><b>Note</b></td>
                                            <td><pre>{{member.note}}</pre></td>
                                        </tr>
                                         <tr>
                                            <td><b>Github</b></td>
                                            <td>
                                                {{member.github}}
                                            </td>
                                        </tr>
                                         <tr>
                                            <td><b>Homepage</b></td>
                                            <td>
                                                {{member.homepage}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>Skills</b></td>
                                            <td>
                                                <span :key="idx" v-for="(skill,idx) in ((member.skill !== null && member.skill !== undefined) ? member.skill.split('|') : [])">
                                                        <span v-if="skill.split('^')[1] === 'BASIC'" class="badge bg-success"  style="margin-right:3px">
                                                           {{skill.split('^')[0]}}
                                                        </span>
                                                        <span v-else-if="skill.split('^')[1] === 'JOB'" class="badge bg-danger"  style="margin-right:3px">
                                                            {{skill.split('^')[0]}}
                                                        </span>
                                                        <span v-else-if="skill.split('^')[1] === 'TOY_PROJECT'" class="badge bg-primary"  style="margin-right:3px">
                                                            {{skill.split('^')[0]}}
                                                        </span>
                                                        <span v-else class="badge bg-warning"  style="margin-right:3px">
                                                            {{skill.split('^')[0]}}
                                                        </span>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-if="currentUser && userid !=member.username">
                                            <td><i class="nav-icon fas fa-edit"></i>&nbsp;<b>쪽지전송</b><br>   <button type="submit" class="btn btn-success" style="width:85px" @click="sendNote()">전송</button></td>
                                            <td>
                                                <textarea class="form-control"  placeholder="쪽지 내용을 입력 하세요." v-model="notesend" maxlength="1000"></textarea>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer clearfix">
                            <div class="float-right">
                             <v-pagination
                                    v-model="page"
                                    :pages="totalPages"
                                    :range-size="rangeSize "
                                    active-color="#007bff"
                                    @update:modelValue="getUserInfoList"
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
import UserService from "../services/user.service";
import VueElementLoading from "vue-element-loading";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "member",
        data() {
            return {
                memberDetailView : true,                
                members : [ ], 
                membersBodyDisplay : [ ] ,
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

            this.getUserInfoList('INIT');
        },
          methods: {
            getUserInfoList(flag) {
                if(flag == 'INIT'){
                    this.page = 1;
                    this.totalPages = 0;
                    this.rangeSize  = 0;
                }

                this.spinnerShow = true;
                UserService.getUserInfoList(this.page-1,2,{"category": "", "keyword" : this.keyword}).then(
                    (response) => {
                       this.page = response.data.data.number+1;
                       this.totalPages = response.data.data.totalPages;
                       this.rangeSize  = response.data.data.number;
                       this.members = response.data.data.content;
                       this.membersBodyDisplay = []
                       response.data.data.content.forEach(() => {
                           this.membersBodyDisplay.push(this.memberDetailView)
                       });
                         this.spinnerShow = false;
                    },
                    (error) => {
                        this.page = 1;
                        this.totalPages = 0;
                        this.rangeSize  = 0;
                        this.spinnerShow = false;
                        this.members = [] 
                        this.membersBodyDisplay = []
                        console.log(
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString());
                    }
               );
            },
            displayBody: function(index) {
                if(this.membersBodyDisplay[index]){
                    this.membersBodyDisplay[index] = false;
                }else{
                    this.membersBodyDisplay[index] = true;
                }
             },
             detailVisible : function(){
                let i = 0;
                this.membersBodyDisplay.forEach(() => {
                    this.membersBodyDisplay[i++] = this.memberDetailView
                });
             }
        },
};
</script>