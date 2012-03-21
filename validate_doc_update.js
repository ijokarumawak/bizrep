function (newDoc, oldDoc, userCtx, secObj) {

	// バリデーション用ライブラリのロード。
	var v = require("vendor/couchapp/lib/validate").init( newDoc, oldDoc, userCtx );
	
	// クライアント側に返却されるさいは次のJSONになる。
	// {"error":"forbidden","reason":"Error Message"}
    // throw({forbidden : "Error Message"});
	if(newDoc.type == "customer"){
		var allow = false;
		// 現在のユーザが管理者。
		allow = v.isAdmin();
		// 現在のユーザが担当になっている
		if(!allow && oldDoc && oldDoc.assignees){
			for(var i = 0; i < oldDoc.assignees.length; i++){
				if(oldDoc.assignees[i].name == userCtx.name){
					allow = true;
					break;
				}
			}
		}
		
		if(!allow){
			throw({forbidden : "更新権限がありません。"});
		}

	} else if(newDoc.type == "employee"){
		
		var allow = false;
		// 現在のユーザが管理者。
		allow = v.isAdmin();
		// 現在のユーザ
		if(!allow){
			if(newDoc.name == userCtx.name){
				allow = true;
			}
		}
		
		if(!allow){
			throw({forbidden : "更新権限がありません。"});
		}

	}



}

