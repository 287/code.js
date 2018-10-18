function isPageLoaded(){
	return ['interactive', 'complete'].includes(document.readyState);
}