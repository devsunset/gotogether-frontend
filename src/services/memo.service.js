import api from './api';

class MemoService {
  getNewReceiveMemo() {
    return api.get('/memo/newreceive');
  }
}

export default new MemoService();
