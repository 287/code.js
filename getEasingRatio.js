/**
 * @param {number} ratio - 0 to 1
 * @param {string} [type = 'swing']
 * @return {number}
 */
function getEasingRatio(ratio, type = 'swing'){
	switch(type){
		case 'linear':
			// nothing to do
			
		break; case 'bounce':
			ratio = bounce(ratio);
			// if(ratio < 0.5){
				// ratio = (1 - bounce(1 - ratio * 2)) * 0.5;
			// }else{
				// ratio = bounce(ratio * 2 - 1) * 0.5 + 0.5;
			// }
			
		break; case 'swing':
			ratio = 0.5 - Math.cos(ratio * Math.PI) / 2;
	}
	
	return ratio;
	
	function bounce(ratio){
        if(ratio < (1 / 2.75)){
            ratio = 7.5625 * ratio * ratio;
        }else if(ratio < (2 / 2.75)){
            ratio = 7.5625 * (ratio -= (1.5 / 2.75)) * ratio + 0.75;
        }else if(ratio < (2.5 / 2.75)){
            ratio = 7.5625 * (ratio -= (2.25 / 2.75)) * ratio + 0.9375;
        }else{
            ratio = 7.5625 * (ratio -= (2.625 / 2.75)) * ratio + 0.984375;
        }
		return ratio;
    }
}