import api from './api';

class PostService {
  // Post
  getPostList(page,size,reqData) {
    return api.post("/post/list?page="+page+"&size="+size,reqData );
  }

  getPost(postId) {
    return api.get("/post/"+postId );
  }

  setPost(reqData) {
    return api.post("/post/",JSON.stringify(reqData));
  }

  putPost(postId,reqData) {
    return api.put("/post/"+postId,JSON.stringify(reqData));
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
    return api.post("/postcomment/",JSON.stringify(reqData));
  }

}

export default new PostService();
