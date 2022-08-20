<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Together Edit</h1>
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
                       <!-- ////////////////////////////////////////////////// -->
                        <div class="card card-primary card-outline">
                        <div class="card-header">
                        <h3 class="card-title" v-if="this.$route.query.togetherId">Edit Together</h3>
                         <h3 class="card-title" v-else>New Together</h3>
                        </div>
                        <div class="card-body">
                        <div class="form-group">
                         <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 제목 
                        <input class="form-control" placeholder="Together 제목을 입력 하세요" v-model="title" ref="title">
                        </div>
                        <div class="form-group">
                        <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 목적
                                <select class="form-control" v-model="category"> 
                                      <option value="STUDY">함께 공부해요</option>
                                      <option value="PORTFOLIO">포트폴리오 구축</option> 
                                      <option value="HACKATHON">해커톤 참가</option> 
                                      <option value="CONTEST">공모전 참가</option> 
                                      <option value="TOY_PROJECT">토이 프로젝트 구축</option> 
                                      <option value="PROJECT">프로젝트 구축</option> 
                                      <option value="ETC">기타</option> 
                                  </select>
                        </div>
                         <div class="form-group">
                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;최대 모집 인원
                            <select class="form-control" v-model="maxMember"> 
                                <option :value="data+1"  :key="index" v-for="(data,index) in 9">{{data+1}}</option>
                            </select>
                        </div>
                         <div class="form-group">
                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;현재 참여 인원
                            <select class="form-control" v-model="currentMember"> 
                                <option :value="data"  :key="index" v-for="(data,index) in 10">{{data}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; Kakao Open Chat Link
                        <input class="form-control" placeholder="Open Kakao Chat Link를  입력 하세요 (옵션)" v-model="openKakaoChat" ref="openKakaoChat">
                        </div>
                        <div class="form-group"> 
                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 상세 설명
                            <QuillEditor theme="snow" toolbar="full"  content-type="html" v-model:content="content" ref="myEditor"/> 
                        </div>
                        <div class="form-group"> 
                            <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; Skill
                                            <div class="card">
                                            <div class="card-header">
                                            <h3 class="card-title">필요한 Skill 항목을 추가해 보세요.</h3>
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
                                                            <option value="INTEREST">관심 있음</option>
                                                            <option value="BASIC">기본 학습</option>
                                                            <option value="TOY_PROJECT">Toy Pjt.</option> 
                                                            <option value="JOB">업무 사용</option>
                                                        </select>
                                                    </td>
                                                    <td><button type="button" @click="setMinusSkill(index)" class="btn btn-block btn-success btn-sm" v-if="index != items.length - 1">-</button><button type="button" @click="setAddSkill()" class="btn btn-block btn-warning btn-sm" v-if="index == items.length - 1">+</button></td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            </div>
                                        </div>
                                 </div>
                        <div class="form-group">
                            <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 참여 방식
                                <select class="form-control" v-model="involveType"> 
                                    <option value="ONLINE">ON LINE </option>
                                     <option value="OFFLINE">OFF LINE </option> 
                                     <option value="ONOFFLINE">ON/OFF LINE </option> 
                                  </select> 
                        </div>
                        </div>

                        <div class="card-footer">
                        <div class="float-right">
                        <button type="submit" class="btn btn-danger" style="margin-left: 45px;" @click="setTogether">Submit</button>
                        <button type="submit" class="btn btn-info" style="margin-left: 15px;" @click="goTogether">List</button>
                        </div>
                        </div>
                        </div>
                        <!-- ////////////////////////////////////////////////// -->
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

export default {
  name: "togetheredit",
        data() {
            return {
                title : '',
                category : 'STUDY',
                content : '',
                involveType : 'ONLINE',
                openKakaoChat : '',
                latitude : '',
                longitude : '', 
                maxMember : 4, 
                currentMember : 1, 
                skill : '', 
                items : [ ] ,
                togethers : [ ], 
                spinnerText: 'Loading ...  ',
                spinnerShow: false,
                spinnerKind: 'bar-fade-scale',
                spinnerColor: '#28a745',
                spinnerSize: '60',
                spinnerDuration: '0.6',
                keyword : "",
                loading : false,
                color: '#007bff',
                size: '22px',
            };
        },
        created() {
            if(this.$route.query.togetherId !== undefined && this.$route.query.togetherId !=""){
                 TogetherService.getTogether(this.$route.query.togetherId).then(
                            (response) => {
                                if(response.data.result == 'S'){
                                    this.category = response.data.data.category;
                                    this.title = response.data.data.title;
                                    this.content = response.data.data.content;
                                    this.$refs.myEditor.setHTML(this.content);
                                    this.involveType = response.data.data.involveType;
                                    this.openKakaoChat = response.data.data.openKakaoChat;
                                    this.latitude = response.data.data.latitude;
                                    this.longitude = response.data.data.longitude;
                                    this.maxMember = response.data.data.maxMember;
                                    this.currentMember  = response.data.data.currentMember ;

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
                                    this.$toast.error(`Fail.`);
                                }
                            },
                            (error) => {
                                 this.items = [
                                        {"item" : "", "level" : "INTEREST"}
                                    ] ;
                                this.$toast.error(`Fail.`);
                                console.log(
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString());
                            }
                    );
            }else{
                  this.items = [
                        {"item" : "", "level" : "INTEREST"}
                    ] ;
            }
        },
        components: {
            VueElementLoading
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
        },
          methods: {
            goTogether() {
                this.$router.push({
                    name: "Together",
                });
            },
            setTogether() {
                if( this.title.trim() == ''){
                    this.$toast.warning(`제목을 입력해 주세요.`);
                    this.$refs.title.focus();
                    return;
                }

                if(this.$refs.myEditor.getText().trim()== ''){
                    this.$toast.warning(`내용을 입력해 주세요.`);
                    return;
                }

                var skillitem = "";
                this.items.forEach(function(d){
                    let tmp = d.item.trim().replace(/\|/g,'').replace(/\^/g,'');
                    if(tmp !='' ){
                        skillitem +=tmp+'^'+d.level+"|"
                    } 
                })

                if(skillitem !=''){
                    skillitem  = skillitem.substring(0,skillitem.length -1)
                }
                this.skill = skillitem;

                this.$confirm("저장 하시겠습니까?").then(() => {
                    var reqData = {
                        title : this.title,
                        category : this.category,
                        content : this.content,
                        involveType : this.involveType,
                        openKakaoChat : this.openKakaoChat,
                        latitude : this.latitude,
                        longitude : this.longitude, 
                        maxMember : this.maxMember, 
                        currentMember : this.currentMember, 
                        skill : this.skill, 
                    }
                    if(this.$route.query.togetherId){
                            TogetherService.putTogether(this.$route.query.togetherId,reqData).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.$toast.success(`Success.`);
                                        this.$router.push({
                                            name: "Together",
                                        });
                                    }else{
                                            this.$toast.error(`Fail.`);
                                    }
                                },
                                (error) => {
                                    this.$toast.error(`Fail.`);
                                    console.log(
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString());
                                }
                        );
                    }else{
                        alert(JSON.stringify(reqData))
                        TogetherService.setTogether(reqData).then(
                            (response) => {
                                if(response.data.result == 'S'){
                                    this.$toast.success(`Success.`);
                                    this.$router.push({
                                        name: "Together",
                                    });
                                }else{
                                    this.$toast.error(`Fail.`);
                                }
                            },
                            (error) => {
                                this.$toast.error(`Fail.`);
                                console.log(
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString());
                            }
                         );
                    }
                 }).catch(() => console.log('no selected'));
            },
             setAddSkill() {
                this.items.push({ item:"", level:"INTEREST"});
             },
             setMinusSkill(idx) {
                  this.items.splice(idx, 1)
             },
        },
};
</script>

<style>
.ql-editor{
    min-height:200px;
}

.ql-script{
   display: none  !important;
}

.ql-clean{
      display: none  !important;
}
</style>