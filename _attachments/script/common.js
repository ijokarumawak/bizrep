function clearMessages(){
	// 古いメッセージを消す。
	$('.alert', $('#messages')).remove();
}

function alertMessages(msg){
	clearMessages();
	for(var i = 0; i < msg.msgs.length; i++) {
		var msgType = msg.msgs[i].type;
		if("success" == msgType || "error" == msgType){
			msgType = "-" + msgType;
		} else {
			msgType = "";
		}
		$('#messages').append("<div class='alert alert" + msgType + " fade in'><a class='close' data-dismiss='alert' href='#'>×</a>" + msg.msgs[i].msg + "</div>");
	}
}

function commonToolTips(){
	$("a[href='index.html']").tooltip({
	    title: "ダッシュボードを表示します。",
	    placement: "bottom"
	});

	$("a[href='customers.html']").tooltip({
	    title: "顧客情報の管理を行います",
	    placement: "bottom"
	});

	$("a[href='employees.html']").tooltip({
	    title: "社員情報の管理を行います",
	    placement: "bottom"
	});
	
}
