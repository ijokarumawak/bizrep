function loadEmployees(){
	clearMessages();
	// http://stackoverflow.com/questions/9522558/couchdb-list-an-error-occured-accessing-the-list-invalid-json-error
	var db = $.couch.db("bizrep");
	db.list("bizrep/employees", "all-employees" ,{
				returnType: "html",
	            success: function(data) {
	            	$("#employees").html(data);
	            	if(window.document.location.hash){
	            		var targetId = window.document.location.hash.replace('#', '');
	            		showEmployee(targetId);
	            	}
	            },
	            error: function(status) {
	            	console.log(status);
	            }
	            });
}

function showEmployee(id) {
	$('#employee').load('_show/employee/employee-' + id,  function(responseText, textStatus, XMLHttpRequest){
		   switch (XMLHttpRequest.status) {
		    case 200:
		    	$('#employees li').removeClass('active');
		    	$('#employees li a[href=#' + id + ']').parent().addClass('active');
		    	break;
		    case 404:
		    	alertMessages({msgs: [{type: "warning", msg: id + "が見つかりません。ページをリロードしてください。"}]});
		    	break;
	    	default:
		    	alertMessages({msgs: [{type: "error", msg: id + " の表示中にエラーが発生しました。" + XMLHttpRequest.status}]});
	    		break;
		   }
	});
}

function editEmployee(id){
	$('#employee').load('_show/employee-edit/employee-' + id, function(){$("input[name=lastName]").focus();});
}

function updateEmployee(id){
	$.ajax({
		url: "_update/employee/employee-" + id,
		type: "POST",
		data: $("#employeeForm").serialize(),
		success: function(data){
			alertMessages({msgs: [{type: "success", msg: data}]});
			showEmployee(id);
		},
		error: function(data){
			console.log(data);
			if(data.responseText){
				var resp = eval('(' + data.responseText + ')');
				alertMessages({msgs: [{type: "error", msg: resp.reason}]});
			}
		}
	});
}

function deleteEmployee(id){
	$.ajax({
		url: "_update/employee/employee-" + id,
		type: "POST",
		data: {delete: "true"},
		success: function(data){
			// TODO: 削除しましたメッセージ。
			// TODO: ログアウト。
			window.location.href = "employees.html";
		},
		error: function(data){
			console.log(data);
			if(data.responseText){
				var resp = eval('(' + data.responseText + ')');
				alertMessages({msgs: [{type: "error", msg: resp.reason}]});
			}
		}
	});
}

