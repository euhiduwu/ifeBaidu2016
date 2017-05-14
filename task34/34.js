var table=document.getElementById('table').children[0];
var input=document.getElementsByTagName('input')[0];
var button=document.getElementsByTagName('button')[0];
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

//默认方向朝上
function render(angle){
	var position=getPosition(obj.x,obj.y);
	var deg=(obj.dir-1)*90%360;
	var span=document.createElement('span');
	span.style='display:inline-block;'+'width:100%;'+'background-color:red;'+
	           'border-top:10px solid blue;'+'height: 100%;';
	span.style.WebkitTransform='rotate('+deg+'deg)';
	position.appendChild(span);
}

window.onload=function(){
	render(1);
	button.onclick=function(){
		var text=input.value.trim().toLowerCase();
	    var position=getPosition(obj.x,obj.y);
		position.innerHTML='';
		switch(text){
			case 'ttop'://方向转向屏幕上侧，并向屏幕的上侧移动一格
			        obj.dir=1;
			        Go(1);
			        setTimeout(render(1),6000);
			        
			        break;
			case 'tright':
			        obj.dir=2;
			        Go(2);
			        render(2);
			        break;
			case 'tback':
			        obj.dir=3;
			        Go(3);
			        render(3);
			        break;
			case 'tleft':
			        obj.dir=4;
			        Go(4);
			        render(4);
			        break;
			case 'mtop'://向屏幕的上侧移动一格，方向不变
			        Go(1);
			        render(1);
			        break;
			case 'mright':
			        Go(2);
			        render(1);
			        break;
			case 'mback':
			        Go(3);
			        render(1);
			        break;
			case 'mleft':
			        Go(4);
			        render(1);
			        break;
			default:break;
		}
	}
	document.onkeydown=function(e){
	    var position=getPosition(obj.x,obj.y);
		position.innerHTML='';
		switch(e.keyCode){
			case 87://方向转向屏幕上侧，并向屏幕的上侧移动一格
			        obj.dir=1;
			        Go(1);
			        setTimeout(render(1),6000);
			        
			        break;
			case 68:
			        obj.dir=2;
			        Go(2);
			        render(2);
			        break;
			case 83:
			        obj.dir=3;
			        Go(3);
			        render(3);
			        break;
			case 65:
			        obj.dir=4;
			        Go(4);
			        render(4);
			        break;
			case 38://向屏幕的上侧移动一格，方向不变
			        Go(1);
			        render(1);
			        break;
			case 39:
			        Go(2);
			        render(1);
			        break;
			case 40:
			        Go(3);
			        render(1);
			        break;
			case 37:
			        Go(4);
			        render(1);
			        break;
			default:break;
		}
	}
}