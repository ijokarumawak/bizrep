function(doc, req) {
    var ddoc = this;

    if("true" == req.form.delete){
    	doc._deleted = true;
    	// return [doc, JSON.stringify({msgs: [{type: "success", msg: doc.name + " を削除しました。"}]})];
    	// レスポンスで返却できるJSONの形式は決まっている。
    	/*
    	var resp = {
    			body: "hogehoge",
    			code: 403
    	};
    	*/
    	
       	return [doc, doc.name + " を削除しました。"];
	}
    
    /*
     * 構造が複雑なため、顧客情報の更新はsaveDocで行う。
    doc.name = req.form.name;
    doc.address = req.form.address;
    doc.url = req.form.url;

    return [doc, JSON.stringify({msgs: [{type: "success", msg: doc.name + " を更新しました。"}]})];
    */
}