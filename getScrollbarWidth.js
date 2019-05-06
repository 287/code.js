/**
 * @return {number} Width of a scrollbar in pixels
 */
function getScrollbarWidth() {
	var div = document.createElement('div');
	div.style.visibility = 'hidden';
	div.style.overflow = 'scroll';
	div.style.width = div.style.height = '50px';
	div.style.position = 'absolute';
	document.body.appendChild(div);
	var result = div.offsetWidth - div.clientWidth;
	div.parentNode.removeChild(div);
	return result;
}