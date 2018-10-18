function toRightAnglePath(p1, p2, type){
	let rs = [];
	let t;
	switch(type){
		case 'x':
			t = getPercentValue(.5, p1[0], p2[0]);
			rs.push(p1, [t, p1[1]], [t, p2[1]], p2);
		break; case 'y':
			t = getPercentValue(.5, p1[1], p2[1]);
			rs.push(p1, [p1[0], t], [p2[0], t], p2);
		break; case true:
			rs.push(p1, [p2[0], p1[1]], p2);
		break; case false:
			rs.push(p1, [p1[0], p2[1]], p2);
		break; default:
			rs.push(p1, p2);
	}
	return rs;
}