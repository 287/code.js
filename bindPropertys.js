/**
 * @include defineProperty
 * bind getter setter from obj.__getter and obj.__setter
 * @param {object} obj
 * @param {array<string>} keys
 */
function bindPropertys(obj, keys){
	keys.forEach(function(key){
		if(key in obj){
			return ;
		}
		defineProperty(obj, key, {
			get: function(){
				return typeof this.__getter === 'function' ? this.__getter(key) : undefined;
			},
			set: function(value){
				return typeof this.__setter === 'function' ? this.__setter(key, value) : undefined;
			},
			enumerable: true
		});
	});
}