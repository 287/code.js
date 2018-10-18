function getWebglSupportedExtensions(){
	return document.createElement('canvas').getContext('webgl').getSupportedExtensions();
}