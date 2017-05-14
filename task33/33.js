var table=document.getElementById('table').children[0];
var input=document.getElementsByTagName('input')[0];
var button=document.getElementsByTagName('button')[0];
var obj={
	dir: 1,//前进方向 上右下左 1 2 3 4
	x: 5,//坐标
	y: 5,
};

//坐标变换
function Go(){
	switch(obj.dir){
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
	var deg=((angle-1)*90+(obj.dir-1)*90)%360;
	var span=document.createElement('span');
	span.style='display:inline-block;'+'width:100%;'+'background-color:red;'+
	           'border-top:10px solid blue;'+'height: 100%;';
	span.style.WebkitTransform='rotate('+deg+'deg)';
	position.appendChild(span);
	switch(deg){
		case 0:
		        obj.dir=1;
		        break;
		case 90:
		        obj.dir=2;
		        break;
		case 180:
		        obj.dir=3;
		        break;
		case 270:
		        obj.dir=4;
		        break;
		default:break;
	}
}

window.onload=function(){
	render(1);
	button.onclick=function(){
		var text=input.value.trim().toLowerCase();
		var position=getPosition(obj.x,obj.y);
		position.innerHTML='';
		switch(text){
			case 'go':
			        Go();
			        render(1);
			        break;
			case 'right':
			        render(2);
			        break;
			case 'back':
			        render(3);
			        break;
			case 'left':
			        render(4);
			        break;
			default:break;
		}
	}
}