//#!py
function isColorLike(value)
	return /^(#([a-f0-9]{3}|[a-f0-9]{3})|(rgb|hsl)a?\(.*?\)|[a-z]+)$/.test(value)