function(e, r) {
  $$(this).userCtx = r.userCtx;
  $$(this).info = r.info;

  console.log(r.userCtx);
  // ログインしたユーザに対応する社員情報が存在しない場合、作成する。
  var db = $.couch.db("bizrep");
  var empId = 'employee-' + r.userCtx.name;
  db.openDoc(empId, {
    error: function(status) {
      if(status == 404) {
        console.log("creating new employee data...");
        var emp = new Object();
        emp._id = empId;
        emp.type = 'employee';
        emp.name = r.userCtx.name;
        emp.roles = r.userCtx.roles;
        db.saveDoc(emp, {
            error: function(status) {
            	console.log(status);
            }
          });
      }
    }
  });
};