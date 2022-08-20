<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0" v-if="this.$route.query.category == 'TALK'">Together Edit Talk</h1>
                <h1 class="m-0" v-else-if="this.$route.query.category == 'QA'">Together Edit Q&A</h1>
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
                                <select class="form-control" v-model="category" disabled> 
                                      <option value="TALK">Talk</option>
                                      <option value="QA">Q&A</option> 
                                  </select>
                        </div>
                        <div class="form-group">
                        <input class="form-control" placeholder="Title" v-model="title" ref="title">
                        </div>
                        <div class="form-group"> 
                            <QuillEditor theme="snow" toolbar="full"  content-type="html" v-model:content="content" ref="myEditor"/>
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
                category : 'TALK',
                title : '',
                content : '',
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
                                    this.$refs.myEditor.setHTML(this.content)
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
                 this.category =  this.$route.query.category;
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
                    query: { category: this.category },
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
                this.$confirm("저장 하시겠습니까?").then(() => {

                    if(this.$route.query.togetherId){
                            TogetherService.putTogether(this.$route.query.togetherId,{"category": this.category, "title" : this.title, "content" : this.content }).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.$toast.success(`Success.`);
                                        this.$router.push({
                                            name: "Together",
                                            query: { category: this.category },
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
                        TogetherService.setTogether({"category": this.category, "title" : this.title, "content" : this.content }).then(
                            (response) => {
                                if(response.data.result == 'S'){
                                    this.$toast.success(`Success.`);
                                    this.$router.push({
                                        name: "Together",
                                        query: { category: this.category },
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