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
                              <span class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input" id="memoDetailView"  v-model="detailView" @change="detailVisible($event)">
                              <label class="custom-control-label" for="memoDetailView">Detail</label>
                              </span>
                            </span>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 300px;">
                                  <select class="form-control" v-model="memoFlag" @change="getMemoList('INIT')"> 
                                      <option value="R">받은 메모함</option>
                                      <option value="S">보낸 메모함</option>
                                  </select>
                                </div>
                            </div>
                    </div>

                    <p/>

                    <div class="col-12" :key="index" v-for="(memo,index) in memos">
                        <div class="card">
                            <div class="card-header" v-on:click="displayBody(index)">
                                <h3 class="card-title"><i class="nav-icon fas fa-envelope"></i>&nbsp; <span v-if="memoFlag == 'R' && memo.readflag === 'N' " class="right badge badge-danger">New</span> &nbsp;<span v-if="memoFlag == 'R'">{{memo.senderNickname}}</span><span v-else-if="memoFlag == 'S'">{{memo.receiverNickname}}</span></h3>
                                <div class="card-tools">
                                        {{memo.createdDate.substring(2,10)}}
                                </div>
                            </div>
                            <div class="card-body" v-show="memoBodyDisplay[index]">
                                <table class="table table-bordered">
                                    <tbody>
                                         <tr>
                                            <td><b>Memo</b><br>
                                            <span v-if="memoFlag == 'S' && memo.readflag === 'Y' " class="right badge badge-success">Receive</span><br>
                                            <span v-if="memoFlag == 'S' && memo.readflag === 'Y' " >{{memo.modifiedDate.substring(5,16)}}</span>
                                            </td>
                                            <td><pre>{{memo.memo}}</pre></td>
                                        </tr>
                                        <tr>
                                            <td><i class="nav-icon fas fa-edit"></i>&nbsp;<b v-if="memoFlag == 'R'">답장전송</b><b v-else-if="memoFlag == 'S'">다시전송</b><br><pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader><button type="submit" v-if="memoFlag == 'R'" v-show="!loading" class="btn btn-success" style="width:85px" @click="sendMemo('memo_' + index, 'receiver_'+index)">전송</button><button type="submit" v-else-if="memoFlag == 'S'" v-show="!loading" class="btn btn-warning" style="width:85px" @click="sendMemo('memo_' + index, 'receiver_'+index)">전송</button></td>
                                            <td>
                                                <textarea class="form-control"  placeholder="메모를 남겨 보세요." maxlength="1000" :ref="'memo_' + index"></textarea>
                                                <input v-if="memoFlag == 'R'" type="hidden" :ref="'receiver_' + index" v-model="memo.senderUsername">
                                                <input v-else-if="memoFlag == 'S'" type="hidden" :ref="'receiver_' + index" v-model="memo.receiverUsername">
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

                this.spinnerShow = true;

              if (this.memoFlag  == 'R'){
                      MemoService.getReceiveMemo(this.page-1,5).then(
                          (response) => {
                            this.page = response.data.data.number+1;
                            this.totalPages = response.data.data.totalPages;
                            this.rangeSize  = response.data.data.number;
                            this.memos = response.data.data.content;
                            this.memoBodyDisplay = []
                            response.data.data.content.forEach(() => {
                                this.memoBodyDisplay.push(this.detailView)
                            });

                              this.spinnerShow = false;
                          },
                          (error) => {
                              this.page = 1;
                              this.totalPages = 0;
                              this.rangeSize  = 0;
                              this.spinnerShow = false;
                              this.memos = [] 
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
                            this.memoBodyDisplay = []
                            response.data.data.content.forEach(() => {
                                this.memoBodyDisplay.push(this.detailView)
                            });
                              this.spinnerShow = false;
                          },
                          (error) => {
                              this.page = 1;
                              this.totalPages = 0;
                              this.rangeSize  = 0;
                              this.spinnerShow = false;
                              this.memos = [] 
                              this.memoBodyDisplay = []
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
            sendMemo(refmemo, refreceiver) {
                if(this.$refs[refmemo].value.trim() == ""){
                   this.$toast.warning(`메모 내용을 입력해 주세요.`);
                   this.$refs[refmemo].focus();
                    return
                }

                this.loading = true;
                
                MemoService.sendMemo({"memo": this.$refs[refmemo].value, "receiver" : this.$refs[refreceiver].value} ).then(
                    (response) => {
                        this.loading = false;
                         if(response.data.result =="S"){
                            this.$refs[refmemo].value = "";
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
                        this.getReadMemo(index);
                     }
                }
             },
             detailVisible : function(){
                let i = 0;
                this.memoBodyDisplay.forEach(() => {
                     if(this.detailView && this.memoFlag === 'R'){
                        this.getReadMemo(i);
                     }
                     this.memoBodyDisplay[i++] = this.detailView
                });
             }, getReadMemo : function (idx){
                if(this.memoFlag === 'R'){
                  if(this.memos[idx].readflag == 'N'){
                        MemoService.getReadMemo(this.memos[idx].memoId  ).then(
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
             }
        },
};
</script>