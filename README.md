# emojiPlugin
移动端emoji聊天表情插件

## 引用：

    本插件基于jq库和swipeSlide轮播插件，由于所用单位为rem，所以使用mobile-until监测屏幕大小和缩放比，主要js为emoji.js所以要引用:
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script src="js/mobile-util.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/swipeSlide.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/emoji.js" type="text/javascript" charset="utf-8"></script>

## 使用：
          $(function(){
             $("#slideTpshop").emoji();
          })

## 变量：


         slideId:'#slideTpshop',//轮播最外层节点id 
         inputTextId:'#face-text',//文本框id
         faceClassBackground:'face-wrap',//表情背景图class
         faceClass:'face-img',//单个表情class
         faceSemantizationProperty:'alt',//表情语义化自定义属性(alt="")
         faceSerializeProperty:'data-index',//表情序列化自定义属性(data-index="")
         sendClass:'.send',//发送按钮class
         sendEvent:'click',//发送事件
         headURL:'images/salesclerk.png',//头像路径
         faceURL:'images/face/',//发送的表情的路径
         informationDisplatWindowClass:'.conversation',//聊天信息发送后显示的窗口
         faceSwitch:'.face',//表情开关class
         faceEvent:'click',//表情开关事件

         inputTextEvent:'blur',//文本框事件，不建议修改
         faceEvent:'click',//表情事件，不建议修改
         cursorStart:'0',//文本框中选定文本的起点，不建议修改
         cursorEnd:'0'//文本框中选定文本的终点，不建议修改
