function extendClass(Child, Parent){
	Child.prototype = Object.create(Parent.prototype);
	Child.constructor = Child;
}