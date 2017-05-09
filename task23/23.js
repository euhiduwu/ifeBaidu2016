var index=0,
    dfList=[],
    btnOne=document.getElementsByTagName('button')[0],
    root=document.getElementById('Supper'),
    flag=false;

function renderDf(){
    var text=document.getElementsByTagName('input')[0]
         .value.trim().replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,"");
	var i=0,len=dfList.length,time;
	for(;i<len;++i)
		dfList[i].style.backgroundColor='white';
	i=0;
	if(dfList[i].firstChild.nodeValue.trim()==text){
		dfList[i].style.backgroundColor='green';
		flag=true;
	}else{
		dfList[i].style.backgroundColor="gold";
	}
    time=setInterval(function(){
    	if(i<len-1){
    		if((dfList[i].firstChild.nodeValue.trim())==text){
    			dfList[i++].style.backgroundColor='green';
    			flag=true;
    		}else{
    			dfList[i].style.backgroundColor='white';
    			dfList[++i].style.backgroundColor='gold';
    		}
    	}else{
			dfList[i].style.backgroundColor='white';
			clearInterval(time);
			if(!flag)
		    	alert("Not Found!");
    	}
    },300);
}

//深度
function traverseDF(node,nodeList){
	if(node){
		nodeList.push(node);
		for(var i=0;i<node.children.length;i++){
			traverseDF(node.children[i],nodeList);
		} 
	}
}

function init(){
	traverseDF(root,dfList);
	btnOne.onclick=renderDf;
}
init();