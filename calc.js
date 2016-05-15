var calc = function (type) {
	var args = [].slice.call(arguments, 1),
	rs = ['*', '/'].indexOf(type) > -1 ? 1 : 0,
	getDotLen = function (v) {
		var len = 0;
		if (v != null && Math.floor(v) !== v) {
			len = v.toString().split('.')[1].length;
		}
		return len;
	},
	i,
	l,
	v,
	lmax,
	lCount;

	if (!rs) {
		lMax = 0;
		for (i = 0; i < args.length; i++) {
			l = getDotLen(args[i]);
			lMax = l > lMax ? l : lMax;
		}
		lMax = Math.pow(10, lMax);
		for (i = 0; i < args.length; i++) {
			v = args[i] * lMax;
			if (type == '-') {
				rs = !i ? v : rs - v;
			} else {
				rs += v;
			}
		}
		rs /= lMax;

	} else {
		lCount = 0;
		for (i = 0; i < args.length; i++) {
			v = args[i];
			l = getDotLen(v);
			v *= Math.pow(10, l);
			if (type == '/') {
				if (!i) {
					rs = v;
					lCount = l;
				} else {
					rs /= v;
					lCount -= l;
				}
			} else {
				rs *= v;
				lCount += l;
			}
		}
		rs /= Math.pow(10, lCount);
	}

	return rs;
};
