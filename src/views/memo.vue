<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Memo</h1>
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
                                 <span class="form-group clearfix" style="margin-left:15px"> 
                                    <div class="icheck-primary d-inline" v-if="memos.length != 0" >
                                        <input type="checkbox" id="delete_all_check" v-model="allCheck" @change="checkAll($event)" >
                                        <label for="delete_all_check">
                                        <button type="button" style="height:22px;width:60px; padding: 0px;" class="btn btn-block btn-danger btn-xs"  @click="setMemoDelete()" >Delete</button>
                                        </label>
                                    </div>
                                </span>
                            </span>
                            <div class="card-tools">
                                <span class="custom-control custom-switch" style="margin-bottom:5px">
                                        <input type="checkbox" class="custom-control-input" id="memoDetailView"  v-model="detailView" @change="detailVisible($event)">
                                        <label class="custom-control-label" for="memoDetailView">Detail Display
                                        </label> 
                                </span>
                                <div class="input-group input-group-sm" style="width:300px"> 
                                  <select class="form-control" v-model="memoFlag" @change="getMemoList('INIT')"> 
                                      <option value="R">수신 메모함</option>
                                      <option value="S">발신 메모함</option> 
                                  </select>
                                </div>
                            </div>
                    </div>

                    <p/>

                    <div v-if="memos.length == 0 && memoFlag == 'R'" class="callout callout-info" style="margin:10px">
                    <h5><i class="fas fa-info"></i> No Data.</h5>
                        <p style="text-align:center"> 수신 메모함 데이타가 없습니다.</p>
                    </div>

                    <div v-if="memos.length == 0 && memoFlag == 'S'" class="callout callout-info" style="margin:10px">
                    <h5><i class="fas fa-info"></i> No Data.</h5>
                        <p style="text-align:center"> 발신 메모함 데이타가  없습니다.</p>
                    </div>

                    <div class="col-12" :key="index" v-for="(memo,index) in memos">
                        <div class="card">
                            <div class="card-header" v-on:click="displayBody(index)">
                                <h3 class="card-title">
                                     <span class="icheck-primary d-inline">
                                        <input type="checkbox"   :id="'check_delete_' + index" :value="memoData[index].memoId" v-model="memoData[index].check">
                                        <label :for="'check_delete_' + index" >
                                        </label>
                                    </span>
                                    <i class="nav-icon fas fa-envelope"></i>&nbsp; <span v-if="memoFlag == 'R' && memo.readflag === 'N' " class="right badge badge-danger">New</span> &nbsp;<span v-if="memoFlag == 'R'">{{memo.senderNickname}}</span><span v-else-if="memoFlag == 'S'">{{memo.receiverNickname}}</span></h3>
                                <div class="card-tools">
                                        {{memo.createdDate.substring(2,10)}}
                                </div>
                            </div>
                            <div class="card-body" v-show="memoBodyDisplay[index]">
                                <table class="table table-bordered">
                                    <tbody>
                                         <tr>
                                            <td><b>Memo</b><br>
                                            <span v-if="memoFlag == 'S' && memo.readflag === 'Y' " class="right badge badge-success">수신일시</span><br>
                                            <span v-if="memoFlag == 'S' && memo.readflag === 'Y' " >{{memo.modifiedDate.substring(5,16)}}</span>
                                            </td>
                                            <td><div style="white-space:pre-wrap;word-break:break-all">{{memo.memo}}</div></td>
                                        </tr>
                                        <tr>
                                            <td><i class="nav-icon fas fa-edit"></i>&nbsp;<b v-if="memoFlag == 'R'">답장전송</b><b v-else-if="memoFlag == 'S'">다시전송</b><br><pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader><button type="submit" v-if="memoFlag == 'R'" v-show="!loading" class="btn btn-success" style="width:85px" @click="sendMemo(index)">Send</button><button type="submit" v-else-if="memoFlag == 'S'" v-show="!loading" class="btn btn-warning" style="width:85px" @click="sendMemo(index)">Send</button></td>
                                            <td>
                                                <textarea class="form-control "  placeholder="메모를 남겨 보세요." maxlength="1000" v-model="memoData[index].memo"></textarea>
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
                                    active-color="#29b3ed"
                                    @update:modelValue="getMemoList"
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
import MemoService from "../services/memo.service";
import VueElementLoading from "vue-element-loading";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "memo",
        data() {
            return {
                detailView : false,         
                memoFlag : "R",       
                memos : [ ], 
                memoData : [ ],
                memoBodyDisplay : [ ] ,
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
                loading : false,
                color: '#007bff',
                size: '22px',
                allCheck: false,
                chekedMemoId: [ ] , 
            };
        },
        components: {
            VueElementLoading
            ,VPagination
            , 'PulseLoader': PulseLoader 
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

            this.getMemoList('INIT');
        },
          methods: {
            getMemoList(flag) {
                if(flag == 'INIT'){
                    this.page = 1;
                    this.totalPages = 0;
                    this.rangeSize  = 0;
                }

                this.detailView = false;    
                this.allCheck = false;

                this.spinnerShow = true;

              if (this.memoFlag  == 'R'){
                      MemoService.getReceiveMemo(this.page-1,5).then(
                          (response) => {
                            this.page = response.data.data.number+1;
                            this.totalPages = response.data.data.totalPages;
                            this.rangeSize  = response.data.data.number;
                            this.memos = response.data.data.content;
                            this.memoData = [];
                            this.memoBodyDisplay = [];
                            response.data.data.content.forEach((data) => {
                                this.memoData.push({"check":false, "memo": '' , "memoId": data.memoId, "senderUsername": data.senderUsername, "receiverUsername": data.receiverUsername });
                                this.memoBodyDisplay.push(this.detailView);
                            });

                              this.spinnerShow = false;
                              this.checkAll();
                          },
                          (error) => {
                              this.checkAll();
                              this.page = 1;
                              this.totalPages = 0;
                              this.rangeSize  = 0;
                              this.spinnerShow = false;
                              this.memos = [] 
                              this.memoData = [] 
                              this.memoBodyDisplay = []
                              console.log(
                              (error.response &&
                                  error.response.data &&
                                  error.response.data.message) ||
                              error.message ||
                              error.toString());
                          }
                    );
              }else{
                  MemoService.getSendMemo(this.page-1,5).then(
                          (response) => {
                            this.page = response.data.data.number+1;
                            this.totalPages = response.data.data.totalPages;
                            this.rangeSize  = response.data.data.number;
                            this.memos = response.data.data.content;
                            this.memoData = [];
                            this.memoBodyDisplay = [];
                            response.data.data.content.forEach((data) => {
                                this.memoData.push({"check":false, "memo": '' , "memoId": data.memoId, "senderUsername": data.senderUsername, "receiverUsername": data.receiverUsername });
                                this.memoBodyDisplay.push(this.detailView);
                            });
                              this.spinnerShow = false;
                              this.checkAll();
                          },
                          (error) => {
                              this.checkAll();
                              this.page = 1;
                              this.totalPages = 0;
                              this.rangeSize  = 0;
                              this.spinnerShow = false;
                              this.memos = [] ;
                              this.memoData = [];
                              this.memoBodyDisplay = [];
                              console.log(
                              (error.response &&
                                  error.response.data &&
                                  error.response.data.message) ||
                              error.message ||
                              error.toString());
                          }
                    );
              }
            },
            sendMemo(index) {
                if(this.memoData[index].memo.trim() == ""){
                   this.$toast.warning(`메모 내용을 입력해 주세요.`);
                    return
                }

                this.loading = true;

                let receiverTarget = '';

                if(this.memoFlag == "R"){
                    receiverTarget  = this.memoData[index].senderUsername;
                }else{
                    receiverTarget  = this.memoData[index].receiverUsername;
                }

                MemoService.sendMemo({"memo": this.memoData[index].memo, "receiver" : receiverTarget } ).then(
                    (response) => {
                        this.loading = false;
                         if(response.data.result =="S"){
                            this.memoData[index].memo = "";
                            this.$toast.success(`Success.`);
                            this.getMemoList('INIT');
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
            },
            displayBody: function(index) {
                if(this.memoBodyDisplay[index]){
                    this.memoBodyDisplay[index] = false;
                }else{
                    this.memoBodyDisplay[index] = true;
                     if(this.memoFlag === 'R'){
                        this.setReadMemo(index);
                        this.emitter.emit('notificationRefresh');
                     }
                }
             },
             detailVisible : function(){
                let i = 0;
                this.memoBodyDisplay.forEach(() => {
                     if(this.detailView && this.memoFlag === 'R'){
                        this.setReadMemo(i);
                     }
                     this.memoBodyDisplay[i++] = this.detailView;
                });

                if(this.detailView && this.memoFlag === 'R'){
                    this.emitter.emit('notificationRefresh');
                }
             }, 
             setReadMemo : function (idx){
                if(this.memoFlag === 'R'){
                  if(this.memos[idx].readflag == 'N'){
                        MemoService.setReadMemo(this.memos[idx].memoId  ).then(
                            (response) => {
                                if(response.data.result == 'S'){
                                      this.memos[idx].readflag = 'Y';
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
                  }
                }
             },
              checkAll : function(){
                let i = 0;
                this.memoData.forEach(() => {
                    if(this.allCheck){
                        this.memoData[i].check = true;
                    }else{
                       this.memoData[i].check = false;
                    }
                    i++;
                });
             }, 
            setMemoDelete : function(){
                let i = 0;
                var checkedValue  = "";
                this.memoData.forEach((data) => {
                     if(data.check){
                        checkedValue += data.memoId +",";
                     }
                     i++;
                });

                if(checkedValue !==""){
                    checkedValue = checkedValue.substring(0,checkedValue.length -1);
                }

                if(i == 0) {
                    return;
                }
           
                if(checkedValue == ""){
                      this.$toast.warning(`삭제할 메모를 선택해 주세요.`);
                      return;
                }

                this.$confirm("삭제 하시겠습니까?").then(() => {
                    if(this.memoFlag === 'R'){
                                MemoService.setDeleteReceiveMemo(checkedValue).then(
                                    (response) => {
                                        if(response.data.result == 'S'){
                                            this.$toast.success(`Success.`);
                                            this.getMemoList('INIT');
                                            this.emitter.emit('notificationRefresh');
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
                            MemoService.setDeleteSendMemo(checkedValue).then(
                                    (response) => {
                                        if(response.data.result == 'S'){
                                            this.$toast.success(`Success.`);
                                            this.getMemoList('INIT');
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
                 }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
             }, 
        },
};
</script>