/**
 * @include eachNode, eachObject
 * @return {undefined}
 */
function removeNodeEvents(dom){
	eachNode(dom, (node)=> {
		let conf = node.byAddNodeEvents;
		if(conf){
			if(conf.binds){
				eachObject(conf.binds, (value, key)=> removeEvent(node, key, value));
			}
		}
		delete node.byAddNodeEvents;
	}));
}