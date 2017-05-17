var data={
	北京:['北京大学','清华大学','北京交通大学'],
	上海:['上海交通大学','复旦大学','同济大学'],
	西安:['西北工业大学','西安交通大学','西安电子科技大学']
}

function selectChange(){
	var selectCity=document.getElementById('city');
	var selectSchool=document.getElementById('school');
	selectCity.onchange=function(){
		var school=data[this.value];
		selectSchool.innerHTML='';
		for(var i=0;i<school.length;++i){
			var option=document.createElement('option');
			option.innerHTML=school[i];
			selectSchool.appendChild(option);
	}
	for(var i=0;i<selectCity.children.length;++i){
		selectCity.children[i].onclick=function(){
		}
	}
}}

function radioChange(){
	var student=document.getElementById('student');
	var nostudent=document.getElementById('nostudent');
	var trOne=document.getElementById('one');
	var trTwo=document.getElementById('two');
	student.onclick=function(){
		nostudent.checked='';
		trOne.style.display='table-row';
		trTwo.style.display='none';
		selectChange();
	}
	nostudent.onclick=function(){
		student.checked='';
		trOne.style.display='none';
		trTwo.style.display='table-row';
		trTwo.children[0].children[0].value='';
	}
}

window.onload=function(){
	radioChange();
}