import api from './api';

class PostService {
  getPostList(page,size,reqData) {
    return api.post("/post/list?page="+page+"&size="+size,reqData );
  }

}

export default new PostService();
