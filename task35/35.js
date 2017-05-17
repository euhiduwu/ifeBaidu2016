var table=document.getElementById('table').children[0];
var input=document.getElementsByTagName('input')[0];
var button=document.getElementsByTagName('button')[0];
var area=document.getElementById('area');
var div=document.getElementById('row');
var action=document.getElementById('action');
var refresh=document.getElementById('refresh');
var data=[];//记录错误行数，改变背景色

var obj={
	dir: 1,//前进方向 上右下左 1 2 3 4
	x: 5,//坐标
	y: 5,
};

//坐标变换
function Go(dir){
	switch(dir){
		case 1:
		    if(obj.y>1)
		    	obj.y--;
		    break;
		case 2:
		    if(obj.x<10)
		    	obj.x++;
		    break;
		case 3:
		    if(obj.y<10)
		    	obj.y++;
		    break;
		case 4:
		    if(obj.x>1)
		    	obj.x--;
		default:break;
	}
}

//获取小方块父节点
function getPosition(x,y){
	return table.children[y].children[x];
}

//默认方向朝上，渲染方块
function render(){
	var position=getPosition(obj.x,obj.y);
	var deg=(obj.dir-1)*90%360;
	var span=document.createElement('span');
	span.style='display:inline-block;'+'width:100%;'+'background-color:red;'+
	           'border-top:10px solid blue;'+'height: 100%;';
	span.style.WebkitTransform='rotate('+deg+'deg)';
	position.appendChild(span);
}

//错误指令所在行背景颜色改变
function errorColorChange(){
	for(var i=0;i<data.length;i++){
		div.children[data[i]].style.backgroundColor='red';
	}
}

//refresh按钮，清楚指令内容
function clearAction(){
	area.value='';
	div.innerHTML='';
}

//添加行号
function addRow(){
	var value=area.value;
	var rows=value.split("\n");
	var arr=[];
	var top=area.scrollTop;
	for (var i=0;i<rows.length;i++) {
		arr.push("<span class='span'>"+(i+1)+"</span>");
	}
	div.innerHTML=arr.join("");
	div.scrollTop=top;
	errorColorChange();
}

//滑轮事件
function scrollTop(){
	var top=area.scrollTop;
	div.scrollTop=top;
}

window.onload=function(){
	render(1);
	action.onclick=function(){
		var value=area.value.toLowerCase().split("\n");
	    var arr=value[value.length-1].split(' ');//texrarea中的最后一行指令
		var way=arr[0];//方式
		var count=arr[1];//距离
		switch(way){
			case 'go':
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
						Go(obj.dir);//直走
				        render();
			        }			        	
			        break;
			case 'ttop'://方向转向屏幕上侧，并向屏幕的上侧移动一格
			        obj.dir=1;
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
			        	Go(1);
				        render();
			        }			        		  
			        break;
			case 'tright':
			        obj.dir=2;
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(2);
				        render();
			        }
			        break;
			case 'tback':
			        obj.dir=3;
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(3);
				        render();
			        }
			        break;
			case 'tleft':
			        obj.dir=4;
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(4);
				        render();
			        }
			        break;
			case 'mtop'://向屏幕的上侧移动一格，方向不变
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(1);
				        render();
			        }
			        break;
			case 'mright':
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(2);
				        render();
			        }
			        break;
			case 'mback':
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(3);
				        render();
			        }
			        break;
			case 'mleft':
			        for(var i=0;i<count;++i){
			        	var position=getPosition(obj.x,obj.y);
						position.innerHTML='';
				        Go(4);
				        render();
			        }
			        break;
			default:
			        data.push(value.length-1);//记录错误指令行号
			        break;
		}
	}

	area.onkeyup=function(){
		addRow();
	}

	area.onscroll=function(){
		scrollTop();
	}

	refresh.onclick=function(){
		clearAction();
	}
}