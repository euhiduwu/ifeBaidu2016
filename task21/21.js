function start(){
    (function(){

	var divOne=document.getElementById("tag");
	var divTwo=document.getElementById("hobby");
	var listOne=new factory(divOne);
	var listTwo=new factory(divTwo);

	var inputpra=document.getElementsByTagName("input")[0];
	inputpra.onkeyup=getTextIuput;
	var textareapra=document.getElementsByTagName("textarea")[0];
	var button=document.getElementsByTagName("button")[0];
	button.onclick=getTextarea;


	function factory(container){
		this.array=[];
		this.print=function(){
			container.innerHTML="";
			var str="";
			for(var i=0;i<this.array.length;++i){
				str+="<p>"+this.array[i]+"</p>";
			}
			container.innerHTML+=str;
			addClickEvent(container,this);
		}
    }

	factory.prototype.del=function(str){
		this.array.splice(str,1);
		this.print();
	}
	factory.prototype.push=function(str){
		this.array.push(str);
	}
	factory.prototype.unshift=function(str){
		this.array.unshift(str);
	}
	factory.prototype.pop=function(){
		this.array.pop();
	}
	factory.prototype.shift=function(){
		this.array.shift();
	}

	function getTextIuput(e){//在每次遇到空格，回车，逗号时，更新Tag列表
		var str=this.value;
		if(/(,| |\，)$/.test(str)||e.keyCode===13){
			var newTag=str.match(/(^[^,\， ]*)/)[0];
			if(listOne.array.indexOf(newTag)===-1&&newTag!==""){
				listOne.push(newTag);
				if(listOne.array.length>10){
					listOne.shift();
				}
				listOne.print();
			}
			this.value="";
		}
	}

	function getTextarea(){
		var value=textareapra.value;
		console.log(value);
		var text=value.trim().split(/,|，|`|、| |　|\t|\r|\n/);
			for(var it in text){
			    if(listTwo.array.indexOf(text[it])===-1){
			    	listTwo.push(text[it]);
			    	if(listTwo.array.length>10){
			    		listTwo.shift();
			    	}
			    }	
			}
		textareapra.value="";
		listTwo.print();
	}

	function addClickEvent(container,list){
		var pra=document.getElementsByTagName("p");
		for(var i=0;i<pra.length;++i){
			pra[i].onclick=function(i){
				return function(){
					return list.del(i);
				}
			}(i)
		}
	}
    })();
}

start();
