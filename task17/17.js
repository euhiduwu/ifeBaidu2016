/*数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

//渲染图表
function renderChart() {
  var divpra=document.getElementsByClassName("aqi-chart-wrap")[0];
  divpra.innerHTML="";
  var bgcolor=["blue","red","yellow","black","green","purple"];
  for(var city in chartData){
    if(city===pageState.nowSelectCity){
      if(pageState.nowGraTime==="day")
      var data=chartData[pageState.nowSelectCity][0];
      else if(pageState.nowGraTime==="week")
      var data=chartData[pageState.nowSelectCity][1];
      else
      var data=chartData[pageState.nowSelectCity][2];
      for(var d in data){
        var pra=document.createElement("p");
        pra.style.display="inline-block";
        pra.style.height=(data[d])+"px";
        divpra.appendChild(pra);
        if(pageState.nowGraTime=="day"){
          pra.style.width="10px";
        }
        else if(pageState.nowGraTime=="week"){
          pra.style.width="30px";
        }
        else{
          pra.style.width="50px";
        }
        pra.style.backgroundColor=bgcolor[parseInt(Math.random()*5)];
      }
    }
  }
}

//日、周、月的radio事件点击时的处理函数
function graTimeChange() {
  // 确定是否选项发生了变化,设置对应数据,调用图表渲染函数
  if(this.value===pageState.nowGraTime){
    return false;
  }
  pageState.nowGraTime=this.value;
  renderChart();
}

//select发生变化时的处理函数
function citySelectChange(){
  // 确定是否选项发生了变化,设置对应数据,调用图表渲染函数
  if(this.value===pageState.nowSelectCity){
    return false;
  }
  pageState.nowSelectCity=this.value;
  renderChart();
}

//初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
function initGraTimeForm(){
  var inputpra=document.getElementsByTagName("input");
  for(var i=0;i<inputpra.length;++i){
    inputpra[i].onclick=graTimeChange;
  }
}

//初始化城市Select下拉选择框中的选项
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var cityselect=document.getElementById("city-select");
  cityselect.innerHTML="";
  for(var city in aqiSourceData){
    cityselect.innerHTML+="<option>"+city+"</option>";
  }
  cityselect.onclick=citySelectChange;
}

//初始化图表需要的数据格式
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式,处理好的数据存到 chartData 中
  for(var city in aqiSourceData){
    chartData[city]=[{},{},{}];
    var sum=0;
    var n=0;
    var weekend=1;

    //day
    chartData[city][0]=aqiSourceData[city];

    //week
    for(var x in aqiSourceData[city]){
      n++;
      sum+=aqiSourceData[city][x];
      if(n%7==0){
        chartData[city][1][weekend]=parseInt(sum/7);
        weekend++;
        sum=0;
      }
      else{
        chartData[city][1][weekend]=parseInt(sum/(n%7));
        sum=0;
      }
    }

    //month
    for(var i=1;i<13;i++){
      var sum=0;
      for(var j=1;j<32;j++){
        var temp=aqiSourceData[city]["2016-"+(((i+'').length ==1)?('0'+i):i)
                 +"-"+(((j+'').length==1)?('0'+j):j)]
        if(temp){
          sum+=temp;
        }
      }
      chartData[city][2][i]=parseInt(sum/j); 
    }
  }
}

//初始化函数
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
init();