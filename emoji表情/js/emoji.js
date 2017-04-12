/*
 * emoji
 * Crown
 * 2017-03-17
 * v1.0
 */
(function($){
	$.fn.emoji = function(options){
		var defaults = {
			slideId:'#slideTpshop',//轮播最外层节点id
			inputTextId:'#face-text',//文本框id
			faceClassBackground:'face-wrap',//表情背景图class
			faceClass:'face-img',//单个表情class
			faceSemantizationProperty:'alt',//表情语义化自定义属性(alt="")
//			faceSemantization:'',//表情语义化自定义值
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
		}
		
		var options = $.extend(defaults,options);
		
		this.each(function(){
			var _this = $(this);
			
			//添加表情
			var expressionHtml = '<ul>';
			for (var i = 1; i <= 5; i++) {
			    expressionHtml += '<li class="facebox"><div class="'+ options.faceClassBackground +' '+ options.faceClassBackground +'-' + i + '">';
			    for(var j = 0; j < 20; j++){
			        var n = 20*(i-1)+j;
			        expressionHtml += '<div '+ options.faceSerializeProperty +'="'+ n +'" class="'+ options.faceClass +'" '+ options.faceSemantizationProperty +' ="[em_'+ n +']"></div>';
			    }
			    expressionHtml += '<div '+ options.faceSerializeProperty +'="-1" class="'+ options.faceClass +'"></div></div></li>';
			}
			expressionHtml += '</ul>';

			_this.append(expressionHtml);
			
			//设置置文本框中选定的文本起始点。只能在代码中使用，第一个字符的位置为0，第二个字符的位置为1，依此类推。
			$(options.inputTextId).bind(options.inputTextEvent,function(){
			    options.cursorStart = $(this).get(0).selectionStart;//光标所在起点
			    options.cursorEnd = $(this).get(0).selectionEnd;//光标所在终点
			})
			
			//表情事件
			$('.'+options.faceClass).bind(options.faceEvent,function(){
				// 获取表情对应code
			    var imgCode = $(this).attr(options.faceSemantizationProperty);
			    // 获取编号判断是否为删除按钮
			    var index = $(this).attr(options.faceSerializeProperty);
//			    var ta = document.querySelector('text');
			    // 删除操作
			    if(index == -1){
			        if ($(options.inputTextId).length) {
			            var text = $(options.inputTextId).val();
			            // 获取光标之前的字符串
			            var changedText = text.substr(0, options.cursorStart);
			            var len = changedText.length;
			            var reg=/\[em_([0-9]*)\]$/g;
			            // 删除表情code块或最后一个字符
			            if(reg.test(changedText)){
			                changedText=changedText.replace(reg,"");
			            }else{
			                changedText=changedText.substring(0,changedText.length-1);
			            }
			            var resText = changedText + text.substr(options.cursorEnd, text.length);
			            $(options.inputTextId).val(resText);
			            // 调整光标位置
			            options.cursorStart = options.cursorEnd = options.cursorEnd - (len - changedText.length);
			        }
			    // 添加操作
			    }else if ($(options.inputTextId).length) {
			        var text = $(options.inputTextId).val();
			        // 添加表情code块到光标位置
			        var resText = text.substr(0, options.cursorStart) + imgCode + text.substr(options.cursorEnd, text.length);
			        $(options.inputTextId).val(resText);
			        options.cursorStart = options.cursorEnd = options.cursorEnd + imgCode.length;
			    }
			})
			
			//send消息
			$(options.sendClass).bind(options.sendEvent,function(){
				var face_text = $(options.inputTextId).val();
				face_text = $.trim(face_text);
				var zz = /\[em_(0|[1-9]\d?)\]/g;
				var zz_num = /(0|[1-9]\d?)/g;
				if(face_text.length){
					$(options.inputTextId).val("");//文本框设置为空
					var fac = face_text.match(zz);//gygy[em_12]ygy[em_12]
					for(var i in fac){
						var fac_num = fac[i].match(zz_num);
						face_text = face_text.replace("[em_"+fac_num+"]","<img src='"+ options.faceURL + fac_num + ".png'/>");
					}
					var userma = 
						'<div class="salesclerk_dialogue customer_dialogue">' + 
						'<div class="saleslogo fr"><img src="'+options.headURL+'">' +
						'</div><div id="showe" class="salescontact fl">' + face_text + '</div></div>';
					
					$(options.informationDisplatWindowClass).find('.maleri50').append(userma);
					$("body").scrollTop($(document).height());//滚动条设置在最下方
				}
			})
			
			//隐藏显示表情
			$(function(){
				var hei_top = $('#he100').height();
				var hei_slide = $(options.slideId).height();
				var allheis = $('.hiddenbox').height();
				var sumheight =  $(window).height();
				$(options.faceSwitch).bind(options.faceEvent,function(){
					if(!$('.write_dialogue').hasClass('write_replece')){
						$('.hiddenbox').css('overflow','initial').height(hei_top + hei_slide);
						$('.write_dialogue').addClass('write_replece');
						$(options.informationDisplatWindowClass).css('min-height',sumheight - hei_top - hei_slide).css('padding-top','1.74933rem');
						$("body").scrollTop($(document).height());//滚动条设置在最下方
					}else{
						Fiddenbox();
					}
				})
				$(options.inputTextId).focus(function(){
					Fiddenbox();
				})
			})
			function Fiddenbox(){//隐藏表情
				$('.hiddenbox').css('overflow','hidden').height($('#he100').height());
				$('.write_dialogue').removeClass('write_replece');
			}
			
			//轮播
			$(function() {
				$(options.slideId).swipeSlide({
					autoSwipe : false,
					continuousScroll: false,
//					speed: 3000,
					transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
					firstCallback: function(i, sum, me) {
						me.find('.dot').children().first().addClass('cur');
					},
					callback: function(i, sum, me) {
						me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
					}
				});
				//圆点
				var ed = $('.mslide ul li').length;
				$('.mslide').append("<div class=" + "dot" + "></div>");
				for(var i = 0; i < ed; i++) {
					$('.mslide .dot').append("<span></span>");
				};
				$('.mslide .dot span:first').addClass('cur');
				var wid = -($('.mslide .dot').width() / 2);
				$('.mslide .dot').css('position', 'absolute').css('left', '50%').css('margin-left', wid);
			});
		})
		return this
	}
})(jQuery);
