import api from './api';

class PostService {
  getPostList(page,size,reqData) {
    return api.post("/post/list?page="+page+"&size="+size,reqData );
  }

  getPost(postId) {
    return api.get("/post/"+postId );
  }

  setPost(reqData) {
    return api.post("/post/",reqData );
  }

  deletePost(postId) {
    return api.delete("/post/"+postId );
  }

  putPost(postId,reqData) {
    return api.put("/post/"+postId,reqData );
  }

}

export default new PostService();
