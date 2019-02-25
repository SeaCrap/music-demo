{
  let view = {
    el: '.page > main',
    template: `
    <form class="form">
    <h1>新建歌曲</h1>
    <div class="row">
    <label>
    歌名
    <input type="text">
    </label>
    </div>
    <div class="row">
    <label>
    歌手
    <input type="text">
    </label>
    </div>
    <div class="row">
    <label>
    外链
    <input type="text">
    </label>
    </div>
    <div class="row">
    <button type="submit">保存</button>
    </div>
    </form>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.eventHub.on('upload', (data)=>{
        console.log('song form 模块得到的 data')
        console.log(data)
      })
    },
  }
  controller.init(view, model)
}
