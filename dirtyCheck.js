/**
 * @param {object} newObject
 * @param {object} oldObject
 * @return {object}
 */
function dirtyCheck(newObject, oldObject){
	let changes = {};
	let i;
	let oldObjectKeys = Object.keys(oldObject);
	Object.keys(newObject).forEach((key)=>{
		if((i = oldObjectKeys.indexOf(key)) > -1){
			oldObjectKeys.splice(i, 1);
			if(newObject[key] !== oldObject[key]){
				changes[key] = {
					value: newObject[key],
					oldValue: oldObject[key],
					type: 'change',
				};
			}
		}else{
			changes[key] = {
				value: newObject[key],
				oldValue: oldObject[key],
				type: 'add',
			};
		}
	});
	oldObjectKeys.forEach((key)=>{
		changes[key] = {
			value: newObject[key],
			oldValue: oldObject[key],
			type: 'delete',
		};
	});
	return changes;
}