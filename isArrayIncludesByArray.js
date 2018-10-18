function isArrayIncludesByArray(array, list){
	return list.every(name=> array.includes(name));
}