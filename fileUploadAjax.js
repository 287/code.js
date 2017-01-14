fileUploadAjax = function(form, fn){
	var frame = document.createElement('iframe')
	;
	form.target = frame.name = 'frame-ajax-' + Math.ceil(Math.random()*1000);
	form.src = 'javascript:;';
	frame.style.display = 'none';
	document.body.appendChild(frame);
	frame.onload = frame.onabort = frame.onerror = function(){
		var rs = frame.contentDocument.body
		;
		frame.parentNode && frame.parentNode.removeChild(frame);
		form.removeAttribute('target');
		rs = quirksJson(rs.innerHTML);
		typeof fn === 'function' && fn.call(null, rs);
	};
}