//角标点击事件
function addArrowClick(){
	var span=document.getElementsByTagName('span');
	for(var j=0;j<span.length;++j){
		span[j].onclick=function(){//span的点击事件
		    var className=this.getAttribute("class").trim();
		    var parent=this.parentNode;
			if(className=='down-arrow'){//若为下箭头，点击后改为右箭头
				var div=parent.getElementsByTagName('div');
				for(var i=0;i<div.length;++i)
					div[i].style.display='none';//隐藏
				this.className='right-arrow';
			}else if(className=='right-arrow'){//若为右箭头，点击后改为下箭头
				var div=parent.getElementsByTagName('div');
				for(var i=0;i<div.length;++i)
					div[i].style.display='block';//显示
		    	this.className='down-arrow';
			    var spa=parent.getElementsByTagName('span');
			    for(var k=0;k<spa.length;++k){
			    	if(spa[k].className!='empty-arrow')
			    		spa[k].className='down-arrow';
			    }
			}else{//空箭头不做处理
				;
			}
		};		
	}
}

//标签a双击事件，显示两个img元素
function addDblClick(){
	var a=document.getElementsByTagName('a');
	for(var i=0;i<a.length;++i){
		a[i].ondblclick=function(e){//双击
			var parent=this.parentNode;
			e.stopPropagation();//防止冒泡			
			if(parent.id=='special'){//全文第一个a标签只有一个img
				this.children[0].style.display='inline';//添加
				this.children[0].onclick=function(){
					add(this.parentNode);
				};
			}else{//其他a
				this.children[0].style.display='inline';//添加
				this.children[0].onclick=function(){
					add(this.parentNode);
				}
				this.children[1].style.display='inline';//删除
				this.children[1].onclick=function(){
					deleteHan(this.parentNode);
				}
			}
		}
	}
}

//搜索，并改变背景色突出显示同时展开显示全内容
function search(){
	var data=[];//记录符合条件的标签
	var text=document.getElementsByTagName('input')[0]
             .value.trim().replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,"");
	var span=document.getElementsByTagName('span');
	var a=document.getElementsByTagName('a');
	for(var i=0;i<span.length;++i){//展开显示全内容
		if(span[i].className!='empty-arrow'){//非空箭头
			span[i].className='down-arrow';
			a[i].className='down';
		}else{
			;
		}
		if(a[i].firstChild.nodeValue.trim()==text){//匹配符合项
			a[i].style.backgroundColor='gold';
			data.push(a[i]);
		}else{
			;
		}
	}
	if(data.length){//是否有匹配项，有则展开显示全内容
		var div=document.getElementsByTagName('div');
		for(var i=0;i<div.length;++i)
			div[i].style.display='block';
	}else{
		var div=document.getElementById('output');
		var p=document.createElement('p');
		p.appendChild(document.createTextNode(text+',not found!'));
		div.appendChild(p);
	}
	
	//setTimeout(clearColor(data),500000);
	//未实现取消突出显示的元素背景
}

function clearColor(data){//search函数里调用，功能未实现
	for(var i=0;i<data.length;++i)
		data[i].style.backgroundColor='green';
}

//点击事件，删除选项子内容
function deleteHan(parent){
	var grandParent=parent.parentNode;
	var grandDblParent=grandParent.parentNode;
	var divmax=grandDblParent.getElementsByTagName('div');
	var divmin=grandParent.getElementsByTagName('div');
	if((divmax.length-divmin.length)==1){
		grandDblParent.children[0].className='empty-arrow';
		grandDblParent.children[1].className='empty';
		grandDblParent.removeChild(grandParent);
	}else{
		grandDblParent.removeChild(grandParent);
	}
}

//添加节点
function add(parent){
	var div=document.createElement('div');
	var text=document.getElementsByTagName('input')[0]
             .value.trim().replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,"");
    var span=document.createElement('span');
    var grandParent=parent.parentNode;
    if(parent.className=='empty'){//若在叶子节点下添加，更改该节点箭头
    	grandParent.children[0].className='down-arrow';
    	grandParent.children[1].className='down';
    }
    span.className='empty-arrow';
    var a=document.createElement('a');
    var textNode=document.createTextNode(text);
    var img1=document.createElement('img');
    var img2=document.createElement('img');
    a.className='empty';
    a.appendChild(textNode);
    img1.src='images/add.png';
    a.appendChild(img1);
    img2.src='images/delete.png';
    a.appendChild(img2);
    div.appendChild(span);
    div.appendChild(a);
    grandParent.appendChild(div);
    addDblClick();//更新事件
    addClick();
    addArrowClick();
}

//标签a单击事件，取消两个img的显示
function addClick(){
	var a=document.getElementsByTagName('a');
	for(var i=0;i<a.length;++i){
		a[i].onclick=function(e){
			var parent=this.parentNode;
			e.stopPropagation();//防止冒泡
			if(parent.id=='special'){//全文第一个a标签只有一个img
				this.children[0].style.display='none';
			}else{
				this.children[0].style.display='none';
				this.children[1].style.display='none';
			}
		}
	}
}

//空箭头为叶子节点，右箭头隐藏子内容，下箭头展开子内容
window.onload=function(){
	addArrowClick();//角标点击事件
	addDblClick();//双击显示'+'/'X'
	addClick();//单击取消'+'/'X'显示
	var btn=document.getElementById('search');
	btn.onclick=search;//搜索
}