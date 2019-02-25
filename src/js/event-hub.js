window.eventHub = {
  events: {
    //'羊城晚报': [fn]
    //'都市快报':[]
  }, // hash
  emit(eventName,data){ // 发布: 把桶里的函数全部 call 一遍 call 的时候带上 data
    for(let key in this.events){
      if(key === eventName){
        let fnList = this.events[key]
        fnList.map((fn)=>{
          fn.call(undefined,data)
        })
      }
    }
  },
  on(eventName, fn){ // 订阅: 把函数入桶
    if(this.events[eventName] === undefined){
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }
}
