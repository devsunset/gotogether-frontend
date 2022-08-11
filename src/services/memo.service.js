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

  getReadMemo(memoId){
    return api.get("/memo/"+memoId);
  }

}

export default new MemoService();
