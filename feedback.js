setTimeout( function(){

	var getXHR = function(){
		var xhr = new XMLHttpRequest;
		xhr.addEventListener("load",  function () {
				console.log(this.responseText)
		});
		xhr.open("POST",  "/feedback");
		xhr.setRequestHeader("Content-type",  "application/json");
		xhr.overrideMimeType("application/json");
		return xhr
	}

	var btn = document.querySelector('div.feedback a')
	btn.onclick = function(){
		var data = {}
		data.note = prompt( this.getAttribute("data-title") )
		if( data.note.length < 2 ) return
		data.browser 				= {}
		data.browser.appCodeName	= navigator.appCodeName
		data.browser.appName		= navigator.appName
		data.browser.appVersion		= navigator.appVersion
		data.browser.cookieEnabled	= navigator.cookieEnabled
		data.browser.onLine			= navigator.onLine
		data.browser.platform		= navigator.platform
		data.browser.userAgent		= navigator.userAgent
		data.browser.plugins		= []
		if( navigator.plugins )
			for( var i in navigator.plugins )
				data.browser.plugins.push( navigator.plugins[i].name )

		data.url = document.URL
		html2canvas( document.body, {
			onrendered: function(canvas) {
				var html = document.documentElement;
				var w = Math.max(document.documentElement.clientWidth,  window.innerWidth || 0)
				var h = Math.max(document.documentElement.clientHeight,  window.innerHeight || 0)
				var _canvas = document.createElement("canvas")
				_canvas.width = w 
				_canvas.height = h 
				_ctx = _canvas.getContext('2d');
				_ctx.drawImage(canvas,  0, document.body.scrollTop, w,  h,  0,  0,  w,  h);
				data.img = _canvas.toDataURL();
				console.log("sending")
				getXHR().send( JSON.stringify({feedback:data}) )
			}
		})
  }

},2500)
