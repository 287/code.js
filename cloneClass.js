function cloneClass(Class, newClassName){
	const newClass = Function('ClassByClone', `return class ${newClassName || Class.name} extends ClassByClone {\n\t//...\n}`)(Class);
	return newClass;
}