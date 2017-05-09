var data=[],
    traverseBtn=document.getElementById('traverse'),
    searchBtn=document.getElementById('search'),
    deleteBtn=document.getElementById('delete'),
    addBtn=document.getElementById('add'),
    root=document.getElementById('supper'),
    flag=null,//true查询到
    fun=null,//true查询/false遍历
    current;//记录当前点击节点

//深度
function traverseDF(node,nodeList){
	if(node){
		nodeList.push(node);
		for(var i=0;i<node.children.length;i++){
			traverseDF(node.children[i],nodeList);
		} 
	}
}

//查询和遍历 由fun控制 fun==true查询/false遍历
function renderDf(){
	data=[];
	traverseDF(root,data);
	var i=0,len=data.length,time;
    var searchText=search.value.trim().replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,"");
	clearColor();
	if((data[i].firstChild.nodeValue.trim()==searchText)&&(fun==true)){
		data[i].style.backgroundColor='green';
		flag=true;
	}else{
		data[i].style.backgroundColor="gold";
	}
    time=setInterval(function(){
    	if(i<len-1){
    		if((data[i].firstChild.nodeValue.trim())==searchText&&fun==true){
    			data[i++].style.backgroundColor='green';
				flag=true;
    		}else{
    			data[i].style.backgroundColor='white';
    			data[++i].style.backgroundColor='gold';
    		}
    	}else{
    		if((data[i].firstChild.nodeValue.trim())==searchText&&fun==true){
    			data[i++].style.backgroundColor='green';
				flag=true;
			}else
			data[i].style.backgroundColor='white';
			clearInterval(time);
			if(fun){
				if(!flag)
		    	alert("Not Found!");
			}
			search.value="";
    	}
    },300);
}

function deleteHan(){
	var content=document.getElementById('content');
    var div=content.getElementsByTagName('div');
    current.parentNode.removeChild(current);
    clearColor();
}

function addClick(){
	var content=document.getElementById('content');
	var div=content.getElementsByTagName('div');
	for(var i=0;i<div.length;++i){
		div[i].onclick=function(e){
			clearColor();
			this.style.backgroundColor='pink';
			e.stopPropagation();//阻止事件冒泡
			current=this;
		};
	}
}

function add(){
	var search=document.getElementById('traverseText');
    var traverseText=search.value.trim().replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,"");
    var div=document.createElement('div');
    div.appendChild(document.createTextNode(traverseText));
    current.appendChild(div);
    current.style.backgroundColor='#fff';
    addClick();
}

function clearColor(){
	var content=document.getElementById('content');
	var div=content.getElementsByTagName('div');
	for(var i=0;i<div.length;++i)
		div[i].style.backgroundColor='#fff';
}

function init(){
	addClick();
	traverseBtn.onclick=(function(){
		fun=false;
		renderDf();
	});
	searchBtn.onclick=(function(){
		flag=false;
		fun=true;
		renderDf();
	});
	deleteBtn.onclick=deleteHan;
	addBtn.onclick=add;
}

init();