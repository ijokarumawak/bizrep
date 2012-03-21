function loadCustomers(){
	clearMessages();
	var db = $.couch.db("bizrep");
	db.list("bizrep/customers", "all-customers" ,{
				returnType: "html",
				// 今のlistの実装じゃ送信できない。
				/*
				ajaxOptions: {
					headers: {
						accept: "text/html; charset=utf-8;"
					}
				},
				*/
	            success: function(data) {
	            	$("#customers").html(data);
	            	if(window.document.location.hash){
	            		var targetId = window.document.location.hash.replace('#', '');
	            		showCustomer(targetId);
	            	}
	            },
	            error: function(status) {
	            	console.log(status);
	            }
	            });
}

function newCustomer() {
	var doc = {type: "customer", createdAt: new Date(), name: '名称未設定'};
    var db = $.couch.db("bizrep");
    db.saveDoc(doc, {
    	success: function(data) {
    		console.log(data);
	    	alertMessages({msgs: [{type: "success", msg: "新規顧客を作成しました。各項目を入力してください。"}]});
    		editCustomer(data.id);
    	},
        error: function(status) {
			console.log(status);
			if(status == 403){
				alertMessages({msgs: [{type: "error", msg: "作成する権限がありません。"}]});
			} else {
				alertMessages({msgs: [{type: "error", msg: "作成できませんでした。"}]});
			}
        }
      });
}

function showCustomer(id) {
	$('#customer').load('_show/customer/' + id,  function(responseText, textStatus, XMLHttpRequest){
		   switch (XMLHttpRequest.status) {
		    case 200:
		    	$('#customers li').removeClass('active');
		    	$('#customers li a[href=#' + id + ']').parent().addClass('active');
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

function editCustomer(id){
	$('#customer').load('_show/customer-edit/' + id, function(){
		$("input[name=name]").focus();
		loadAssignees();
	});
}

function updateCustomer(id, rev){
    var db = $.couch.db("bizrep");
    var customer = {_id: id, _rev: rev, type: "customer"};
	$.each($('#customerForm > input'), function(index, value){
		customer[$(value).attr("name")] = $(value).attr("value");
	});
	
	var people = [];
	$.each($('.person', '#people'), function(index, value){
		var person = {};
		$.each($('input', value), function(index, value){
			person[$(value).attr("name")] = $(value).attr("value");
		});
		people.push(person);
	});
	customer.people = people;
	
	// 担当者
	var assignees = [];
	$.each($('.assignee', '#assignees'), function(index, value){
		var assignee = {};
		assignee["name"] = $('select[name=name]', value)[0].value;
		$.each($('input', value), function(index, value){
			assignee[$(value).attr("name")] = $(value).attr("value");
		});
		assignees.push(assignee);
	});
	customer.assignees = assignees;
	
    db.saveDoc(customer, {
    	success: function(data) {
        	console.log(data);
			alertMessages({msgs: [{type: "success", msg: customer.name + "を更新しました。"}]});
			showCustomer(id);
    	},
        error: function(status) {
			console.log(status);
			if(status == 403){
				alertMessages({msgs: [{type: "error", msg: "更新権限がありません。"}]});
			} else if(status == 409){
				alertMessages({msgs: [{type: "error", msg: "他のユーザにより更新されています。"}]});
			} else {
				alertMessages({msgs: [{type: "error", msg: "更新できませんでした。"}]});
			}
        }
      });    
	
}

function deleteCustomer(id){
	$.ajax({
		url: "_update/customer/" + id,
		type: "POST",
		data: {delete: "true"},
		success: function(data){
			// TODO: 削除しましたメッセージ。
			window.location.href = "customers.html";
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

function addPerson(){
	var person = $('#person-template').clone();
	$('#people').append(person);
	person.show();
	setPopovers();
}

function addAssignee(){
	var assignee = $('#assignee-template').clone();
	$('#assignees').append(assignee);
	assignee.show();
	setPopovers();
}

function loadAssignees() {
	$.getJSON('_view/all-employees', function(data) {
		  var items = [];

		  $.each(data.rows, function(index, val) {
			  var sel = index == 0 ? ' selected=\"true\" ' : '';
			  items.push('<option' + sel + '>' + val.key + '</option>');
		  });

		  $('#assignees-template').append(items.join(''));
		});
}

function setPopovers(){
    $('#addPersonBtn').popover({
    	title: "お客様情報を追加します",
    	content: "クリックすると、template/partials/customer_edit.html内の#person-template要素をクローンし、新規の入力項目を生成します。",
    	placement: "right"
    });
    $('.deleteElementBtn').popover({
    	title: "要素を削除します",
    	content: "クリックすると該当のdiv要素をDOMから削除します。",
    	placement: "right"
    });
    $('#addAssigneeBtn').popover({
    	title: "担当者情報を追加します",
    	content: "クリックすると、template/partials/customer_edit.html内の#assignee-template要素をクローンし、新規の入力項目を生成します。担当者のプルダウンはloadAssignees()内でCouchDBのViewを利用して作成しています。",
    	placement: "right"
    });
    $('#saveBtn').popover({
    	title: "編集した内容を保存します",
    	content: "クリックすると、ブラウザ上でフォームバリデーションを実行します。正常の場合、入力内容をCouchDBに保存します。管理者権限のあるユーザか、当顧客情報の担当者しか保存できません。その後、顧客情報表示画面に戻ります。",
    	placement: "right"
    });
    $('#cancelBtn').popover({
    	title: "編集をキャンセルします",
    	content: "クリックすると、入力内容を破棄し、顧客情報表示画面に戻ります。",
    	placement: "right"
    });
}