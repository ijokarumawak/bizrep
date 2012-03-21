function(doc, req) {
    var ddoc = this;

    if("true" == req.form.delete){
    	doc._deleted = true;
    	return [doc, doc.name + " を削除しました。"];
    }
    
    doc.lastName = req.form.lastName;
    doc.firstName = req.form.firstName;
    doc.department = req.form.department;
    doc.title = req.form.title;

    // 更新後のドキュメントと、クライアントに返却するJSON文字列。
    return [doc, doc.name + " を更新しました。"];
}