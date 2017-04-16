//全局变量
var data=new Array();
//初始化
function init(){
	var leftIn=document.getElementById("unshift");
	var rightIn=document.getElementById("push");
	var leftOut=document.getElementById("shift");
	var rightOut=document.getElementById("pop");
	leftIn.onclick=unshift;
	rightIn.onclick=push;
	leftOut.onclick=shift;
	rightOut.onclick=pop;
}
//左侧入
function unshift(){
    var content=document.getElementsByTagName("input")[0].value;
	if(numberRight(content)){
		data.unshift(content);
    	unshiftOut(content);
	}
	else{
		alert("请输入合法的数字。")
	}
}
//右侧入
function push(){
	var content=document.getElementsByTagName("input")[0].value;
	if(numberRight(content)){
		data.push(content);
     	pushOut(content);
	}
	else{
		alert("请输入合法的数字。")
	}
}
//左侧出
function shift(){
	data.shift();
	shiftOut();
}
//右侧出
function pop(){
	data.pop();
	popOut();
}
//左侧入输出
function unshiftOut(content){
	if (document.getElementsByTagName("P").length==0) {
     	var pra=document.createElement("p");
	    document.getElementById("div").appendChild(pra);
	}
    else{
	    var pra=document.createElement("p");
        var prahead=document.getElementsByTagName("p")[0];
    	prahead.parentNode.insertBefore(pra,prahead);
    }
	pra.onclick=deleteOut;
	pra.style.height=content*5+'px';
}
//右侧入输出
function pushOut(content){
	var head=document.getElementById("div");
	var pra=document.createElement("p");
	pra.onclick=deleteOut;
	head.appendChild(pra);
	pra.style.height=content*5+'px';
}
//左侧出输出
function shiftOut(){
	var pra=document.getElementsByTagName("p")[0];
	pra.parentNode.removeChild(pra);			
}
//右侧出输出
function popOut(){
	var pra=document.getElementById("div").lastChild;
	pra.parentNode.removeChild(pra);
}
//点击移除
function deleteOut(){
	alert("移除的数字为:"+parseInt(this.style.height)/5);
	var pra=document.getElementsByTagName("p");
	for (var i=0;i<pra.length;i++) {
		if(pra[i].style.height==this.style.height){
			pra[i].parentNode.removeChild(pra[i]);
			break;
		}
	}
}
//判断是否在1~100范围内
function numberRight(content){
	if(content>=1&&content<=100){
		return true;
	}
	else{
		return false;
	}
}
init();