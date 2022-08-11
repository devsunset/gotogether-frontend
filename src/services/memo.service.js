import api from './api';

class MemoService {
  getNewReceiveMemo() {
    return api.get('/memo/newreceive');
  }

  sendMemo(reqData) {
    return api.post("/memo/",reqData );
  }

}

export default new MemoService();
