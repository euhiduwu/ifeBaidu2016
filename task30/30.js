var input=document.getElementsByTagName('input');
var a=document.getElementsByTagName('a');
var password='';//记录第二项密码
var data=[];//记录五项数据的正确与否

//焦点获取事件
function addFocus(){
	input[0].onfocus=function(){
		a[0].style.display='inline';//显示输入提示
	}
	input[1].onfocus=function(){
		a[1].style.display='inline';
	}
	input[2].onfocus=function(){
		a[2].style.display='inline';
	}
	input[3].onfocus=function(){
		a[3].style.display='inline';
	}
	input[4].onfocus=function(){
		a[4].style.display='inline';
	}
}

//焦点失去事件
function addBlur(){
	var value;//输入框的内容
	input[0].onblur=function(){
		value=this.value;
		test(0,value);
	}
	input[1].onblur=function(){
		value=this.value;
		test(1,value);
	}
	input[2].onblur=function(){
		value=this.value;
		test(2,value);
	}
	input[3].onblur=function(){
		value=this.value;
		test(3,value);
	}
	input[4].onblur=function(){
		value=this.value;
		test(4,value);
	}
}

function test(i,value){
	var flag=0,length;
	switch(i){
        case 0:
            length=countLength(value);//4~16位长度
            flag=/^[a-zA-Z0-9_]{4,16}$/.test(value)&&length>=4&&length<=16;
            break;
        case 1:
            length=countLength(value);
            flag=/^\S{4,16}$/.test(value)&&length>=4&&length<=16;
            password=value;
            break;
        case 2:
            length=countLength(value);
            if(length>=4&&length<=16){
            	flag=(value==password);
            	break;
            }else{
            	break;
            }
        case 3:
            flag=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
            break;
        case 4:
            var reg=/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
            flag=reg.test(value);
            break;
        default: break;
    }
    data[i]=flag;
    if(flag){
    	input[i].style.border='1px solid green';
    	a[i].innerHTML='格式正确';
    	a[i].style.color='green';
    }else{
    	input[i].style.border='1px solid red';
    	a[i].innerHTML='格式错误';
    	a[i].style.color='red';
    }
}

//button提交事件
function submit(){
	var button=document.getElementsByTagName('button')[0];
	button.onclick=function(){
		for(var i=0;i<data.length;++i){//遍历data中是否含有0
			pos=i;
			if(data[pos]==0){
				alert('提交失败');
				return;
			}
		}
		alert('提交成功');
	}
}

//计算数据长度
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

window.onload=function(){
	addFocus();
	addBlur();
	submit();
}