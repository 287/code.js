function isES6(){
	var es6 = false;
	try{
		let a;
		()=>{};
		class b {}
		es6 = true;
	}catch(e){}
	return es6;
}