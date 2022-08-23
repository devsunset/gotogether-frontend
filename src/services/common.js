class Common {
  replaceDoubleQuotes(reqData) {
    alert(reqData)
    if(typeof reqData === 'object' && reqData !== null){
       alert("x")
      var convertReqData = {};
      for (const [key, value] of Object.entries(reqData)) {
        if(value !==null && value !=''){
          value = value.replace(/\"/g,'\'')
        }
        convertReqData.push({key,value})
      }

      return JSON.stringify(convertReqData)
    }else{
      return reqData
    }
  }
}

export default new Common();
