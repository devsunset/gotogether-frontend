import api from './api';

class TogetherService {
    getTogetherList(page,size,reqData) {
      return api.post("/together/list?page="+page+"&size="+size,reqData );
    }

    getTogether(togetherId) {
      return api.get("/together/"+togetherId );
    }

    setTogether(reqData) {
      return api.post("/together/",reqData );
    }

    putTogether(togetherId,reqData) {
      return api.put("/together/"+togetherId,reqData );
    }

    deleteTogether(togetherId) {
      return api.delete("/together/"+togetherId );
    }

    changeTogetherCategory(togetherId) {
      return api.put("/together/changecategory/"+togetherId );
    }

    // TogetherComment
    getTogetherCommentList(togetherId) {
      return api.get("/togethercomment/list/"+togetherId);
    }

    deleteTogetherComment(togetherCommentId) {
      return api.delete("/togethercomment/"+togetherCommentId );
    }

    setTogetherComment(reqData) {
      return api.post("/togethercomment/",reqData );
    }
  
}
export default new TogetherService (); 