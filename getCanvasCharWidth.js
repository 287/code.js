function getCanvasCharWidth(ctx, stores){
	stores = stores || {};
	return function(c){
		var key = ctx.font;
		var store = stores[key] = stores[key] || {};
		store[c] = store[c] !== undefined ? store[c] : ctx.measureText(c).width;
		return store[c];
	};
}