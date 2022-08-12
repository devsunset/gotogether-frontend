import api from './api';

class MemoService {
  getNewReceiveMemo() {
    return api.get('/memo/newreceive');
  }

  sendMemo(reqData) {
    return api.post("/memo/",reqData );
  }

  getReceiveMemo(page,size){
    return api.get("/memo/receivelist?page="+page+"&size="+size);
  }

  getSendMemo(page,size){
    return api.get("/memo/sendlist?page="+page+"&size="+size);
  }

  setReadMemo(memoId){
    return api.post("/memo/updateread/"+memoId);
  }

  setDeleteReceiveMemo(reqData) {
    return api.delete("/memo/deletereceive", {
      data: { 
        idSeparatorValues: reqData
      }
    });
  }

  setDeleteSendMemo(reqData) {
    return api.delete("/memo/deletesend", {
      data: { 
        idSeparatorValues: reqData
      }
    });
  }

}

export default new MemoService();
