function getImageDataUrlByUrl(url, fn){
	var img = new Image();
	img.crossOrigin = '';
	img.src = url;
	
	//document.body.appendChild(img);
	
	img.onload = function(){
		var canvas = document.createElement('canvas')
		, ctx
		, rs
		;
		
		canvas.width = img.clientWidth;
		canvas.height = img.clientHeight;
		ctx = canvas.getContext('2d');
		//document.body.appendChild(canvas);
		
		ctx.drawImage(img, 0, 0);

		rs = canvas.toDataURL();
		
		fn.call(null, rs);
	}
}