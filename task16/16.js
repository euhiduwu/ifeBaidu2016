//变量命名形式为标签+"pra"
//aqiData，存储用户输入的空气指数数据
var aqiData=new Array();

//从用户输入中获取数据，向aqiData中增加一条数据 
function addAqiData(){
	var inputcity=document.getElementById("aqi-city-input").value;
    var inputvalue=document.getElementById("aqi-value-input").value;
    inputcity=inputcity.replace(/\s/g, "");
    inputvalue=inputvalue.replace(/\s/g, "");
    if(!isInteger(inputvalue)){
    	alert("请输入合法的数字。");
    	return;
    }
    if(inputcity.length==0||inputvalue.length==0){
    	alert("输入字符不能为空");
    }
    else{
        inputvalue=parseInt(inputvalue);
    	aqiData[0]=inputcity;
    	aqiData[1]=inputvalue;
        renderAqiList();
    }
}

//渲染aqi-table表格
function renderAqiList(){
	var tablepra=document.getElementById("aqi-table");
	var trpra=document.createElement("tr");
	tablepra.append(trpra);
	var tdone=document.createElement("td");
	var tdoneText=document.createTextNode(aqiData[0]);
	tdone.append(tdoneText);
	trpra.append(tdone);
	var tdtwo=document.createElement("td");
	var tdtwoText=document.createTextNode(aqiData[1]);
	tdtwo.append(tdtwoText);
	trpra.append(tdtwo);
	var tdthree=document.createElement("td");
	var buttonpra=document.createElement("button");
	var buttonText=document.createTextNode("删除");
	buttonpra.onclick=delBtnHandle;
	buttonpra.append(buttonText);
	tdthree.append(buttonpra);
	trpra.append(tdthree);
}

//点击add-btn时的处理逻辑
//获取用户输入，更新数据，并进行页面呈现的更新
function addBtnHandle(){
  addAqiData();
}

//点击各个删除按钮的时候的处理逻辑
//获取哪个城市数据被删，删除数据，更新表格显示
function delBtnHandle(){
	var trpra=this.parentNode.parentNode;
	var tablepra=document.getElementById("aqi-table");
	console.log("删除城市为:"+trpra.children[0].innerText+
		  ","+"空气质量指数:"+trpra.children[1].innerText);
	tablepra.removeChild(trpra);
}

// add-btn绑定一个点击事件，触发addBtnHandle函数
function init(){
	var btn=document.getElementById("add-btn");
	btn.onclick=addBtnHandle;
}
function isInteger(temp){
	return temp%1===0;
}
init();