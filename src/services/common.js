class Common {
  replaceDoubleQuotes(reqData) {
    alert(reqData)
    if(typeof reqData === 'object' && reqData !== null){
       alert("x")
      var convertReqData = {};
      for (const [key, value] of Object.entries(reqData)) {
        var rvalue = ''
        if(value !==null && value !=''){
          rvalue = value.replace(/"/g,'\'')
        }
        convertReqData.push({key,rvalue})
      }

      return JSON.stringify(convertReqData)
    }else{
      return reqData
    }
  }
}

export default new Common();
