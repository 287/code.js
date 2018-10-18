//#!py
function generateColorLinearGradientBar(step)
	step = step || 50
	const hs = []
	for let i = 0, l = 360; i < l; i += step 
		hs.push(i)
	
	const hsls = hs.map(h=> `hsl(${h}, 100%, 50%)`)
	return `linear-gradient(to left, ${hsls.join(', ')})`