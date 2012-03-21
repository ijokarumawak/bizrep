function(doc) {
	if(doc.type == 'employee'){
		emit(doc.name, null);
	}
}