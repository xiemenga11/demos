(function(){
	function isDom(obj){
		return ((typeof obj == "object") && (obj instanceof Object) && ("tagName" in obj))
	}
	var isClass = /^\./
	var isId = /^#/
	var Diag = function(obj,i){
		if(isDom(obj)){
			this.obj = obj
		}else if(isClass.test(obj)){
			var i = i || 0
			// alert('class')
			this.obj = document.getElementsByClassName(obj)[i]
		}else if(isId.test(obj)){
			this.obj = document.getElementById(obj)
			// alert('id')
		}else{
			this.obj = document.createElement(obj)
			document.getElementsByTagName('body')[0].appendChild(this.obj)
		}
		classList(this.obj).add('leo-diag')
		this.obj.innerHTML = "";
		
		this.title = document.createElement('div')
		this.title.className = "title"
		this.obj.appendChild(this.title)

		this.content = document.createElement('div')
		this.content.className = "content"
		this.obj.appendChild(this.content)

		this.btnBox = document.createElement('div')
		this.btnBox.className = "btn-box"
		this.obj.appendChild(this.btnBox)

		this.btn = document.createElement('button')
		this.btn.className = "confirm"
		this.btnBox.appendChild(this.btn)
	}

	Diag.prototype = function(){
		config:{
			type:"alert",
			title:"",
			content:"",
			btns:[{
				btnTxt:"",
				callback:null
				type:"confirm"
			}]
		}
	}

	function classList(obj){
		if(obj.classList){
			return obj.classList
		}else{
			return new _ClassList(obj)
		}
	}
	var _ClassList = function(obj){
		this.obj = obj
		this.cls = this.obj.className.split(" ")
	}
	_ClassList.prototype = {
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
}())