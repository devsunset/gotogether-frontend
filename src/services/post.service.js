import api from './api';
import Common from './common.js'

class PostService {
  // Post
  getPostList(page,size,reqData) {
    return api.post("/post/list?page="+page+"&size="+size,reqData );
  }

  getPost(postId) {
    return api.get("/post/"+postId );
  }

  setPost(reqData) {
    return api.post("/post/",Common.preRequestHandler(reqData));
  }

  putPost(postId,reqData) {
    return api.put("/post/"+postId,Common.preRequestHandler(reqData));
  }

  deletePost(postId) {
    return api.delete("/post/"+postId );
  }

  changePostCategory(postId) {
    return api.put("/post/changecategory/"+postId );
  }

  // PostComment
  getPostCommentList(postId) {
    return api.get("/postcomment/list/"+postId);
  }

  deletePostComment(postCommentId) {
    return api.delete("/postcomment/"+postCommentId );
  }

  setPostComment(reqData) {
    return api.post("/postcomment/",Common.preRequestHandler(reqData));
  }

}

export default new PostService();
