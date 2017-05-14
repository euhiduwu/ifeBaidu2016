function countLength(data){
	var sum=0,code=0;
	for(var i=0;i<data.length;++i){
		code=data.charCodeAt(i);
		if(code>=0&&code<=128)
			sum+=1;
		else
			sum+=2;
	}
	return sum;
}

function test(){
	var a=document.getElementsByTagName('a')[0];
	var input=document.getElementsByTagName('input')[0];
	var text=input.value;
	var length=countLength(text);
	if(length==0){
		a.innerHTML='姓名不能为空';
		a.style.color='red';
		input.style.border='1px solid red';
	}else if(length>=4&&length<=16){
		a.innerHTML='格式正确';
		a.style.color='green';
		input.style.border='1px solid green';
	}else{
		a.innerHTML='请输入长度4~16的字符';
		a.style.color='red';
		input.style.border='1px solid red';
	}
}

window.onload=function(){
	var button=document.getElementsByTagName('button')[0];
	button.onclick=test;
}