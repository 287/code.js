
class CommonModal {
	/**
	 * @include createNodesByClasss
	 * @param {object} [op] 
	 * @param {object} [op.contents = {}]
	 * @param {string} [op.title]
	 * @param {string} [op.content]
	 */
	constructor(op = {}){
		this.doms = createNodesByClasss(
			{
				wrap: {
					header: {
						title: null,
						close: null,
					},
					body: {
						content: null,
					},
					footer: {
						buttons: null,
					},
				}
			},
			{
				attrName: 'modal-role',
			}
		);
		this.dom = this.doms.wrap;
		['title', 'content'].forEach((key)=>{
			if(op[key] != null){
				this.doms[key].innerHTML = op[key];
			}
		});
	}
	
	attr(key, value){
		if(value === undefined){
			return this[key];
		}else{
			this[key] = value;
			if(this.dom[key]){
				this.doms[key].innerHTML = op[key];
			}
			return this;
		}
	}
	
	/**
	 * @include apply, appendStyleNode
	 */
	show(p){
		if(!this.dom.parentNode){
			document.body.appendChild(this.dom);
		}
		if(!this.styleNode){
			this.styleNode = appendStyleNode(`
[modal-role=wrap]{
	position: absolute;
    overflow: hidden;
    border: 1px #989898 solid;
    border-radius: 3px;
}
[modal-role=body]{
    padding: 5px 8px;
}
			`, 'modal-style');
			document.body.appendChild(this.dom);
		}
		
		if(p){
			['left', 'top'].forEach((key, i)=>{
				this.dom.style[key] = p[i] + 'px';
			});
		}
		
		apply(this.onshow, [this]);
	}
	
	/**
	 * @include apply
	 */
	close(){
		if(this.dom.parentNode){
			this.dom.parentNode.removeChild(this.dom);
		}
		apply(this.onclose, [this]);
	}
}