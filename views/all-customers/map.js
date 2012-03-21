function(doc) {
	if(doc.type == 'customer'){
		emit(doc.name, null);
	}
}