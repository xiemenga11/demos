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