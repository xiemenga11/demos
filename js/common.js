var dom = {
	id:function(id){
		return document.getElementById(id)
	},
	_class:function(cls){
		return document.getElementsByClassName(cls)
	},
	tag:function(tag){
		return document.getElementsByTagName(tag)
	},
	create:function(tag){
		return document.createElement(tag)
	}

}


var ClassList = function(obj){
	this.obj = obj
	this.cls = this.obj.className.split(" ")
}
ClassList.prototype = {
	contains:function(cls){
		return this.cls.indexOf(cls) == -1 ? false : true
	},
	item:function(index){
		return this.cls[index]
	},
	remove:function(cls){
		for(var i = 0; i < arguments.length; i++){
			var _index = this.cls.indexOf(arguments[i])
			if(_index === -1) continue;
			else delete this.cls[_index];
		}
		this.obj.className = this.cls.join(" ")
	},
	add:function(cls){
		for(var i = 0; i < arguments.length; i++){
			if(this.contains(arguments[i])) continue;
			else this.cls.push(arguments[i]);
		}
		this.obj.className = this.cls.join(" ")
	},
	toggle:function(cls,condition){
		if(this.contains(cls)){
			this.remove(cls)
		}else{
			this.add(cls)
		}
	}
}

function strToJson(str){
	var res;
	if(JSON.parse){
		res = JSON.parse(str);
	}else{
		res = (new Function('return '+str)());
	}
	return res;
}
function ajax(url,callback,method){
	var method = method || 'get';
	var xml;
	if(window.XMLHttpRequest){
		xml = new XMLHttpRequest()
	}else{
		xml = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xml.onreadystatechange = function(){
		if(xml.readyState == 4 && xml.status == 200){
			callback(xml.responseText)
		}
	}
	xml.open(method,url,true)
	xml.send(null)
}
var View = function(data){
	this.data = data.data;
	this.tpl = data.tpl;
	this.ele = data.ele;
}
View.prototype = {
	render:function(){
		var ele = this.ele,
			data = this.data;
		ajax(this.tpl,function(ret){
			for(var i in data){
				ret = ret.replace("{{"+i+"}}",data[i]);			
			}
			ele.innerHTML = ret;
		})
	}
}