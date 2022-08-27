import api from "./api";
import Common from "./common.js";

class TogetherService {
  getTogetherList(page, size, reqData) {
    return api.post("/together/list?page=" + page + "&size=" + size, reqData);
  }

  getTogether(togetherId) {
    return api.get("/together/" + togetherId);
  }

  setTogether(reqData) {
    return api.post("/together/", Common.preRequestHandler(reqData));
  }

  putTogether(togetherId, reqData) {
    return api.put(
      "/together/" + togetherId,
      Common.preRequestHandler(reqData)
    );
  }

  deleteTogether(togetherId) {
    return api.delete("/together/" + togetherId);
  }

  changeTogetherCategory(togetherId) {
    return api.put("/together/changecategory/" + togetherId);
  }

  // TogetherComment
  getTogetherCommentList(togetherId) {
    return api.get("/togethercomment/list/" + togetherId);
  }

  deleteTogetherComment(togetherCommentId) {
    return api.delete("/togethercomment/" + togetherCommentId);
  }

  setTogetherComment(reqData) {
    return api.post("/togethercomment/", Common.preRequestHandler(reqData));
  }
}
export default new TogetherService();
