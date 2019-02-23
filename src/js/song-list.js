{
  let view = {
    el: '#songList-container',
    template:`
    <ul class="songList">
    <li> 好久不见 </li>
    <li> K歌之王 </li>
    <li class="active"> 富士山下 </li>
    <li> 浮夸 </li>
    <li>  枫 </li>
    <li> 黑色毛衣 </li>
    <li> K歌之王 </li>
    <li> 富士山下 </li>
    <li> 我的底盘 </li>
    <li> 双节棍 </li>
    </ul>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
    }
  }
  controller.init(view,model)
}
