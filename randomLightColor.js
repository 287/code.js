//#!py
/**
 * @include hsvArray2hslArray random
 */
function randomLightColor(size = 50)
	const arr = hsvArray2hslArray([
		random(360),
		// 0,
		random(60, 100),
		random(80, 100),
		// 100,
		// random(100 - size, 100),
		// random(100 - size, 100),
	]).map((v, i)=> i && v + '%' || v)
	
	return `hsl(${arr})`