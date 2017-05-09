function Event(){
	this.data=[],

	this.reset=function(){
		this.data=[];
		var div=document.getElementsByTagName('div');
		for(var i=0;i<div.length;++i){
			div[i].style.backgroundColor="#fff";
		}
	},

	this.changeColor=function(){
        var i=0;
        this.data[i].style.backgroundColor="blue";
		var that=this;
        setInterval(function(){
			i++;
        	if(i<that.data.length){
				that.data[i-1].style.backgroundColor='#fff';
				that.data[i].style.backgroundColor='blue';
			}else{
				that.data[that.data.length-1].style.backgroundColor='#fff';
			}
	    },800);
	},

	this.preOrder=function(node){
		if(node!=null){
			this.data.push(node);
			this.preOrder(node.firstElementChild);
			this.preOrder(node.lastElementChild);
		}
	},

	this.inOrder=function(node){
		if(node!=null){
			this.inOrder(node.firstElementChild);
			this.data.push(node);
			this.inOrder(node.lastElementChild);
		}		
	},

	this.postOrder=function(node){
		if(node!=null){
			this.postOrder(node.firstElementChild);
			this.postOrder(node.lastElementChild);
			this.data.push(node);
		}				
	}
}

function order(){
	var root=document.getElementById('body');
	var event=new Event;
	event.reset();
	switch(this.id){
		case "btnOne":event.preOrder(root);
		              break;
	    case "btnTwo":event.inOrder(root);
	                  break;
	    case "btnThree":event.postOrder(root);
	                    break;
	    default:break;
	}
	event.changeColor();
}

function init(){
	var btn=document.getElementsByTagName('button');
	for(var i=0;i<btn.length;++i){
		btn[i].onclick=order;
	}
}

init();