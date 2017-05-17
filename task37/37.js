var login=document.getElementById('login');
var mask=document.getElementById('mask');
var appear=document.getElementById('appear');
var confirm=document.getElementById('confirm');
var cancle=document.getElementById('cancle');

function appearhan(){
	mask.style.display='block';
	mask.style.height=document.documentElement.clientHeight+'px';
	appear.style.display='block';
	window.onmousewheel=document.onmousewheel=function(){
		return false;
	};
}

function disappear(){
	mask.style.display='none';
	appear.style.display='none';
	window.onmousewheel=document.onmousewheel=function(){
		return true;
	};
}

window.onload=function(){
	login.onclick=appearhan;
	cancle.onclick=disappear;
	confirm.onclick=disappear;
	appear.onmousedown=function(){
		mouse();
	}
}

function mouse(ev){
    this.onmousemove=function(ev){  
	    appear.style.left=ev.clientX+'px';
	    appear.style.top=ev.clientY+'px';
   }
   this.onmouseup=function(ev){
      this.onmousemove=null;//将move清除
      this.onmouseup=null;
   }
   return false;//火狐的bug，要阻止默认事件
   document.onclick=disappear;
}
