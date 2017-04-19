var sourceText=new Array();
var searchText;

//获取textarea的内容
function getSourceText(){
	var Text=document.getElementsByTagName("textarea")[0].value.trim();
	sourceText=Text.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,"");
	putSourceText();
}

//输出textarea的内容
function putSourceText(){
	var bodypra=document.getElementsByTagName("body")[0];                         
	var divpra=document.createElement("div");
	for(var it in sourceText){
		var spanpra=document.createElement("span");
	    spanpra.innerText=sourceText[it];
	    divpra.appendChild(spanpra);
	}
	bodypra.appendChild(divpra);
}

//获取input的内容
function getSearchText(){
	searchText=document.getElementsByTagName("input")[0].value;
	match();
}

//匹配标识
function match(){
	var spanpra=document.getElementsByTagName("span");
	for(var i=0;i<spanpra.length;++i)
		spanpra[i].style.backgroundColor="red";
	for(var it in sourceText){
		var pos=sourceText.indexOf(searchText,it);
		if(pos!==-1){
			var spanpra=document.getElementsByTagName("span");
			for(var j=0;j<searchText.length;++j)
				spanpra[pos+j].style.backgroundColor="green";
		}
	}
}

function start(){
	var insertpra=document.getElementsByClassName("display")[0];
	insertpra.onclick=getSourceText;
	var searchpra=document.getElementsByClassName("search")[0];
	searchpra.onclick=getSearchText;
}
start();