function toCanvasPoint(p){
	switch(p.length){
	case 2:
		p = p.slice(0, 2);
		
	break; case 4:
		p = p.slice(2, 4).concat(p.slice(0, 2));
		
	break; case 5:
		p = p.slice(0, 5);
		p[3] *= Math.PI / 180;
		p[4] *= Math.PI / 180;
		p[5] = p[3] >= p[4];
		
	break; case 6:
		if(p[5] === 'a'){
			p = p.slice(2, 4).concat(p.slice(0, 2), [p[4]]);
		}else{
			p = p.slice(2, 6).concat(p.slice(0, 2));
		}
		
	break; default:
		p = null;
		
	}
	
	return p;
}