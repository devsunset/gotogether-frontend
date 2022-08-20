import api from './api';

class TogetherService {
  getTogetherList(page,size,reqData) {
    return api.post("/together/list?page="+page+"&size="+size,reqData );
  }
}

export default new TogetherService (); 
