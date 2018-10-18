function randomNumber(length){
	length = length == null ? 6 :length;
	return Math.round(Math.random() * Math.pow(10, length));
}